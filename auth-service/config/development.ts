export default {
  redisConfig: {
    url: process.env.REDIS_PUBSUB_URL || 'redis://host.docker.internal:6379',
  }, 
  rabbitMQConfig: {
    url: process.env.RABBITMQ_URL || 'amqp://host.docker.internal:5672',
  }
}