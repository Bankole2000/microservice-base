import { Channel } from "amqplib";
import { RedisCustomClient } from "../redisConnect";

declare namespace Express {
  export interface Request {
     channel?: Channel,
     user?: any, 
     redis?: RedisCustomClient
  }
}

export type AppService = {
  name: string,
  exchange: string
}