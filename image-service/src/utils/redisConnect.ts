import {createClient} from 'redis';
import config from 'config';
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

export default { pubSub, client, connect };