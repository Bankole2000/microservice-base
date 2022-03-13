import { Express, Request, Response } from "express";
import { testController } from "./controller/test.controller";


export default function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    // req.redis.client.set('message', JSON.stringify({message : 'Yo World - Auth Service'}));
    // req.redis.pubSub.emit('auth-service:ready', { message: 'Auth Service is ready' });
    res.send("Hello World!");
  });
  app.get("/test", testController)
}