import { Request, Response } from "express";

export const registerController = async (req: Request, res: Response) => {
  console.log(req.body)
  
  res.send("Register Handler Working");
}