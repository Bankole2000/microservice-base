import config from "config";
import amqp from 'amqplib';

async function connect() {
  try {
    const connection = await amqp.connect(config.get<string>('rabbitMQConfig.url'));
    const channel = await connection.createChannel();
    await channel.assertQueue(config.get<string>('queue'), { durable: true });
    await channel.assertExchange(config.get<string>('rabbitMQConfig.exchange'), 'fanout');

    // console.log({result});
    console.log('🚀 🐰 RabbitMQ connected');
    return channel;
  } catch (error) {
    console.log(error);
  }
}

export default {connect};