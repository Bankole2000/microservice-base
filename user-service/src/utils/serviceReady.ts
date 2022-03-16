import { Channel } from "amqplib";
import config from "config";
import { exchangeJobsHandlers } from "../jobHanders/exchange.jobs";
import { AppService } from "./interfaces/custom";
import { RedisCustomClient } from "./redisConnect";


export const serviceReady = async (redis: RedisCustomClient) => {
  const services = await redis.client.get('services');
  const upServices: AppService[] = await JSON.parse(services || '[]');
  if(!upServices.map((x:AppService) => x.name).includes(config.get<string>('serviceName'))) {
    upServices.push({name: config.get<string>('serviceName'), exchange: config.get<string>('rabbitMQConfig.exchange')});
    await redis.client.set('services', JSON.stringify(upServices));
    await redis.pubSub.emit(`${config.get<string>('serviceName')}:ready`, { name: config.get<string>('serviceName'), exchange: config.get<string>('rabbitMQConfig.exchange') });
  }
}

export const serviceDown = async (redis: RedisCustomClient) => {
  const services = await redis.client.get('services');
  const upServices: AppService[] = await JSON.parse(services as string || '[]');
  if(upServices.map((x:any) => x.name).includes(config.get<string>('serviceName'))) {
    const thisService: AppService = upServices.find((x:any) => x.name === config.get<string>('serviceName')) as AppService;
    upServices.splice(upServices.indexOf(thisService, 1));
    redis.client.set('up-services', JSON.stringify(upServices));
  }
}

export const serviceDiscovery = async (redis: RedisCustomClient, channel: Channel) => {
  const services = await redis.client.get('services');
  const upServices = await JSON.parse(services || '[]');
  if(upServices.length > 0) {
    await Promise.all(upServices.map(async (service: AppService) => {
      if(service.name !== config.get<string>('serviceName')) {
        await channel.assertExchange(service.exchange, 'fanout');
        const q = await channel.assertQueue('', {exclusive: true});
        await channel.bindQueue(q.queue, service.exchange, '')
        channel.consume(q.queue, (message: any) => {
          exchangeJobsHandlers(message, channel)
        })
      } 
    }))
  }
}