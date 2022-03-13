export default {
  port: process.env.PORT || 3000,
  serviceName: 'auth-service',
  queue: 'auth-jobs',
  redisConfig: {
    port: process.env.REDIS_PUBSUB_PORT || 6379,
    scope: process.env.REDIS_PUBSUB_SCOPE || 'waleproject',
    url: process.env.REDIS_PUBSUB_URL || 'redis://localhost:6379',
  }, 
  rabbitMQConfig: {
    url: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
    exchange: process.env.RABBITMQ_EX || 'auth-logs',
  }
}