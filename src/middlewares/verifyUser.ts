import { NextFunction, Request, Response } from "express";
import * as jose from "jose";
import { PrismaClient, Prisma } from "@prisma/client";
import IUser from '../interfaces/IUser';
const prisma = new PrismaClient();
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "Token not found" });
  }
  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string }
    })
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};
