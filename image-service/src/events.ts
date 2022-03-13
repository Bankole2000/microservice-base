import config from 'config'
import { exchangeJobsHandlers } from './jobHandlers/exchange.jobs'

export const redisSubscriptions = (redis: any, channel: any) => {
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

