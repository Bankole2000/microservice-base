import { Express, Request, Response } from "express";
import { testController } from "./controllers/test.controller";

export default (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    res.send("OK");
  });

  app.get('/test', testController)
}