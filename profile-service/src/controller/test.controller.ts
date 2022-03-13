import config from 'config';
import { Request, Response } from "express";

interface RMQServiceMessage {
  origin: string, 
  message: string,
  type: string, 
  data?: any

}

abstract class ServiceMessage implements RMQServiceMessage {
  constructor(origin: string, message: string, type: string, data?: any) {
    this.origin = origin;
    this.message = message;
    this.type = type;
    this.data = data || '';
  }
  origin: string;
  message: string;
  type: string;
  data?: any;

  abstract stringify(): string;
}

class RMQMessage extends ServiceMessage {
  constructor(origin: string, message: string, type: string, data?: any) {
    super(origin, message, type, data);
  }

  stringify(): string {
    return JSON.stringify(this);
  }
}

const message = new RMQMessage(config.get<string>('serviceName'), 'Just a test', 'TEST').stringify();


export async function testController(req: Request, res: Response) {
  await req.channel.publish(config.get<string>('rabbitMQConfig.exchange'), '', Buffer.from(message));
  res.send('Great Test dude!');
}