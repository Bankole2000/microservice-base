import config from "config";
import { exchangeJobsHandlers } from "../jobHandlers/exchange.jobs";

export const serviceReady = async (redis: any) => {
  const services = await redis.client.get('services');
  const upServices = await JSON.parse(services || '[]');
  if(!upServices.map((x:any) => x.name).includes(config.get<string>('serviceName'))) {
    upServices.push({name: config.get<string>('serviceName'), exchange: config.get<string>('rabbitMQConfig.exchange')});
    await redis.client.set('services', JSON.stringify(upServices));
    await redis.pubSub.emit(`${config.get<string>('serviceName')}:ready`, { name: config.get<string>('serviceName'), exchange: config.get<string>('rabbitMQConfig.exchange') });
  }
}

export const serviceDown = async (redis: any) => {
  const services = redis.client.get('services');
  const upServices = await JSON.parse(services as string || '[]');
  if(upServices.map((x:any) => x.name).includes(config.get<string>('serviceName'))) {
    upServices.splice(upServices.indexOf(config.get<string>('serviceName')), 1);
    redis.client.set('up-services', JSON.stringify(upServices));
  }
}

export const serviceDiscovery = async (redis: any, channel: any) => {
  const services = await redis.client.get('services');
  const upServices = await JSON.parse(services || '[]');
  if(upServices.length > 0) {
    await Promise.all(upServices.map(async (service:any) => {
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