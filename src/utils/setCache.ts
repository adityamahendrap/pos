import { Request, NextFunction } from "express";
import { createClient } from "redis";
import logger from "./logger";
const client = createClient();

export default async (req: Request, next: NextFunction, data: object) => {
  const key = req.user.id + " " + req.method + " " + req.originalUrl;

  try {
    const expirationTime: number = 10;
    const fdata = JSON.stringify(data)
    await client.connect();
    await client.set(key, fdata);
    await client.set(key, fdata, { EX: expirationTime });
    const res = await client.get(key);
    const parsedRes = JSON.parse(res);
    logger.info("Cache created");
  } catch (err) {
    next(err);
  } finally {
    await client.disconnect();
  }
};
