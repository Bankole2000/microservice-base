import express, { Express, Request, Response } from "express";
import config from 'config';
import cors from 'cors';
import routes from "./routes";
import redis from "./utils/redisConnect";
import rabbitMQ from "./utils/rabbitMQConnect";
import { redisSubscriptions } from "./events";
import { rabbitMQConsumers } from "./jobs";
import { serviceDiscovery, serviceReady } from "./utils/serviceReady";


const port = config.get<number>('port');

const app: Express = express();

app.use(express.json());

app.use(cors());

app.listen(port, async () => {
  const channel = await rabbitMQ.connect();
  await redis.connect();
  app.use(async (req: Request, _, next: any) => {
    req.channel = channel;
    req.redis = redis;
    next();
  })
  redisSubscriptions(redis, channel);
  rabbitMQConsumers(channel, redis);
  routes(app);
  serviceReady(redis);
  serviceDiscovery(redis, channel);
  console.log(`🚀 📸 Image Service running on http://localhost:${port}`);
})

app.get('/', (req: Request, res:Response) => {
  // redis.client.set('message', JSON.stringify({message: 'Yo - Image Service'}));
  // redis.pubSub.emit('image-service:ready', { message: 'Image Service is ready' });
  res.send('OK');
})

app.get('/reply', async (req: Request, res:Response) => {
  const data = await redis.client.get('message');
  res.send({data});
})