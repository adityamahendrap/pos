import { Request, Response, NextFunction } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  fetch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payments = await prisma.payment.findMany({})
      const count: number = payments.length

      console.log("User accessed payments");
      return res.status(200).send({ message: "Payments retrieved successfully", count, data: payments})
    } catch (err) {
      console.log(err);
    }
  },

  detail: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    
    try {
      const payment = await prisma.payment.findUnique({
        where: { id }
      })
      if(!payment) {
        return res.status(404).send('Payment not found')
      }
      console.log("User accessed payment");
      return res.status(200).send({ message: "Payment retrieved successfully", data: payment})
    } catch (err) {
      console.log(err);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    const { name, type, logo }: { name: string, type: any, logo: string } = req.body

    try {
      await prisma.payment.create({
        data: { name, type, logo }
      })

      console.log('User created a payment');
      return res.status(201).send({ message: "Payment created"})
    } catch (err) {
      console.log(err);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    const { name, type, logo }: { name: string, type: any, logo: string } = req.body
    const { id } = req.params
    
    try {
      await prisma.payment.update({
        where: { id },
        data: { name, type, logo }
      })

      console.log("User updated payment");
      return res.status(201).send({ message: "Payment updated successfully" })
    } catch (err) {
      if(err instanceof Prisma.PrismaClientKnownRequestError) {
        if(err.code === 'P2025') {
          return res.status(404).send({ message: "Payment not found"})
        }
      }
      console.log(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
      await prisma.payment.delete({
        where: { id }
      })
      console.log("User deleted payment");
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
      console.log(err);
    }
  }
}
