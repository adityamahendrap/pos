import { Request, Response, NextFunction } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import logger from '../utils/logger';
import setCache from "../utils/setCache";
import pagination from '../utils/pagination';
const prisma = new PrismaClient();

export default {
  fetch: async (req: Request, res: Response, next: NextFunction) => {
    const { limit, skip } = req.query
    
    try {
      const payments = await prisma.payment.findMany({
        ...pagination.prisma(limit as string, skip as string)
      })
      const data = {
        ...pagination.meta(payments.length, limit as string, skip as string),
        payments
      }

      logger.info("User accessed payments");
      setCache(req, next, data)
      return res.status(200).send({ message: "Payments retrieved successfully", data})
    } catch (err) {
      next(err);
    }
  },

  detail: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    
    try {
      const payment = await prisma.payment.findUnique({ where: { id } })
      if(!payment) {
        return res.status(404).send('Payment not found')
      }

      logger.info("User accessed payment");
      setCache(req, next, payment)
      return res.status(200).send({ message: "Payment retrieved successfully", data: payment})
    } catch (err) {
      next(err);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    const { name, type, logo } = req.body

    try {
      await prisma.payment.create({
        data: { name, type, logo }
      })

      logger.info('User created a payment');
      return res.status(201).send({ message: "Payment created"})
    } catch (err) {
      next(err);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    const { name, type, logo } = req.body
    const { id } = req.params
    
    try {
      await prisma.payment.update({
        where: { id },
        data: { name, type, logo }
      })

      logger.info("User updated payment");
      return res.status(201).send({ message: "Payment updated successfully" })
    } catch (err) {
      if(err instanceof Prisma.PrismaClientKnownRequestError) {
        if(err.code === 'P2025') {
          return res.status(404).send({ message: "Payment not found"})
        }
      }
      next(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
      await prisma.payment.delete({ where: { id } })

      logger.info("User deleted payment");
      return res.status(200).send({ message: "Payment deleted successfully" })
    } catch (err) {
      if(err instanceof Prisma.PrismaClientKnownRequestError) {
        if(err.code === 'P2025') {
          return res.status(404).send({ message: "Payment not found"})
        }
        if(err.code === 'P2003') {
          return res.status(409).send({ message: "Foreign key constraint failed"})
        }
      }
      next(err);
    }
  }
}
