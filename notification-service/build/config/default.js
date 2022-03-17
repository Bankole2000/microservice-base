"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    port: process.env.PORT || 4001,
    serviceName: 'notification-service',
    queue: 'notification-jobs',
    redisConfig: {
        port: process.env.REDIS_PUBSUB_PORT || 6379,
        scope: process.env.REDIS_PUBSUB_SCOPE || 'waleproject',
        url: process.env.REDIS_PUBSUB_URL || 'redis://redis:6379',
    },
    rabbitMQConfig: {
        url: process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672',
        exchange: process.env.RABBITMQ_EX || 'notification-logs',
    }
};
