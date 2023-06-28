import { Request, Response, NextFunction } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import logger from '../utils/logger';
import pagination from '../utils/pagination';
const prisma = new PrismaClient();

export default {
  fetch: async (req: Request, res: Response, next: NextFunction) => {
    const { limit, skip } = req.query

    try {
      const users = await prisma.user.findMany({
        select: { id: true, name: true, email: true, role: true, createdAt: true },
        ...pagination.prisma(limit as string, skip as string)
      })
      const data = {
        ...pagination.meta(users.length, limit as string, skip as string),
        users
      }

      logger.info("User accessed users");
      return res.status(200).send({ message: "Users retrieved successfully", data})
    } catch (err) {
      next(err)
    }
  },

  detail: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    
    try {
      const user = await prisma.user.findUnique({ where: { id } })
      if(!user) {
        return res.status(404).send('User not found')
      }

      logger.info("User accessed user");
      return res.status(200).send({ message: "User retrieved successfully", data: user })
    } catch (err) {
      next(err)
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } =  req.params
    const { name, role, isVerify } = req.body

    try {
      await prisma.user.update({
        where: { id },
        data: { name, role, isVerify }
      })

      logger.info("User updated user");
      return res.status(201).send({ message: "User updated successfully" })
    } catch (err) {
      if(err instanceof Prisma.PrismaClientKnownRequestError) {
        if(err.code === 'P2025') {
          return res.status(404).send({ message: "User not found"})
        }
      }
      next(err)
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { id } =  req.params

    try {
      await prisma.user.delete({ where: { id } })

      logger.info("User deleted user");
      return res.status(200).send({ message: "User deleted successfully" })
    } catch (err) {
      if(err instanceof Prisma.PrismaClientKnownRequestError) {
        if(err.code === 'P2025') {
          return res.status(404).send({ message: "User not found"})
        }
      }
      next(err)
    }
  },
}
