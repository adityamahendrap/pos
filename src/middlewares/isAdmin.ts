import { NextFunction, Request, Response } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  if(req.user.role !== "ADMIN") {
    return res.status(403).send({ message: "Only admin can access this route" })
  }
  next()
}