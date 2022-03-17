import { Express, Request, Response } from "express";

export default function routes(app: Express) {
  app.get('/',async (req:Request, res: Response) => {
    res.send("Notification Service Working");
  })

  app.get('/test',async (req:Request, res: Response) => {
    res.status(200).send({message: 'It Works', data: []})
  })
}