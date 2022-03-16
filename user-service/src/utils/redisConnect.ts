import {createClient} from 'redis';
import config from 'config';
import { RedisClientType } from 'redis';
const NRP = require('node-redis-pubsub');

const redisURL = config.get<string>('redisConfig.url');
const client = createClient({ url: redisURL });
const pubSub = new NRP({  url: redisURL, scope: config.get<string>('redisConfig.scope') });

async function connect(): Promise<void> {
  try {
    await client.connect()
    console.log('🚀 🧧 Redis connected');
  } catch (error) {
    console.log({error});
    process.exit(1);
  }
}

type PubSub = ReturnType<typeof pubSub>;
type RedisConnection = ReturnType<typeof connect>;

export type RedisCustomClient =  {
  client: RedisClientType,
  pubSub: PubSub,
  connect: RedisConnection
}

export default { pubSub, client, connect };