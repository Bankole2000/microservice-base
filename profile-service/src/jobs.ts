import config from "config";
export const rabbitMQConsumers = async (channel: any, redis: any) => {
  channel.consume(config.get<string>('queue'), (message: any ) => {
    console.log("🚀 ~ file: events.ts ~ line 20 ~ channel.consume ~ message:", message.content.toString())
    setTimeout(() => {
      console.log(`${config.get<string>('serviceName')} handled message: `, message.content.toString());
      channel.ack(message);
    }, 5000);
  })
}