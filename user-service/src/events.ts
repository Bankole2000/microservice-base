import { Channel } from 'amqplib'
import config from 'config'
import { exchangeJobsHandlers } from './jobHanders/exchange.jobs'
import { RedisCustomClient } from './utils/redisConnect'


export const redisSubscriptions = (redis: RedisCustomClient, channel: Channel) => {
  redis.pubSub.on('*:ready', async (data: any) => {
    const q = await channel.assertQueue('', {exclusive: true})
    if(data.name !== config.get<string>('serviceName')) {
      await channel.bindQueue(q.queue, data.exchange, '')
      channel.consume(q.queue, (message: any) => {
        exchangeJobsHandlers(message, channel)
      })
    }
  })
}

