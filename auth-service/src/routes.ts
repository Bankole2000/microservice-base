import { Express, Request, Response } from "express";
import { loginController } from "./controllers/login.controller";
import { registerController } from "./controllers/register.controller";
import { testController } from "./controllers/test.controller";

export default function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    // req.redis.client.set('message', JSON.stringify({message : 'Yo World - Auth Service'}));
    // req.redis.pubSub.emit('auth-service:ready', { message: 'Auth Service is ready' });
    res.send("Hello World!");
  });
  app.get("/test", testController)
  app.post('/login', loginController)
  app.post('/register', registerController)
}