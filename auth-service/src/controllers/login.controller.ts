import { Request, Response } from "express";

export const loginController = (req: Request, res: Response) => {
  console.log(req.body);
  res.send("Login Handler Working");
}