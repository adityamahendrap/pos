import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from 'express';

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err); 

  if(err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).send({ message: 'invalid request body, please read the documentation for this API' })
  }

  return res.status(500).send({ message: 'Internal Server Error' });
};
