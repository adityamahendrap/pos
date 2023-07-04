import { Request, Response, NextFunction } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import logger from '../utils/logger';
import setCache from "../utils/setCache";
import pagination from '../utils/pagination';
const prisma = new PrismaClient();

export default {
  fetch: async (req: Request, res: Response, next: NextFunction) => {
    const { name, limit, skip } = req.query

    try {
      let products = await prisma.product.findMany({
        where: { name: name as string },
        select: selectFetch,
        ...pagination.prisma(limit as string, skip as string)
      })
      const data = {
        ...pagination.meta(products.length, limit as string, skip as string),
        products
      }
      
      logger.info("User accessed products");
      setCache(req, next, data)
      return res.status(200).send({ message: "Products retrieved successfully", data})
    } catch (err) {
      console.log(err);
    }
  },

  detail: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    
    try {
      const product = await prisma.product.findUnique({
        where: { id },
        select: selectDetail
      })
      if(!product) {
        return res.status(404).send({ message: 'Product not found' })
      }

      logger.info("User accessed product");
      setCache(req, next, product)
      return res.status(200).send({ message: "product retrieved successfully", data: product})
    } catch (err) {
      console.log(err);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    const { sku, name, stock, price, categoryId, image } = req.body

    try {
      await prisma.product.create({
        data: { sku, name, stock, price, categoryId, image }
      })

      logger.info('User created a product');
      return res.status(201).send({ message: "product created"})
    } catch (err) {
      console.log(err);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    const { sku, name, stock, price, categoryId, image } = req.body
    const { id } = req.params
    
    try {
      await prisma.product.update({
        where: { id },
        data: { sku, name, stock, price, categoryId, image }
      })

      logger.info("User updated product");
      return res.status(201).send({ message: "product updated successfully" })
    } catch (err) {
      if(err instanceof Prisma.PrismaClientKnownRequestError) {
        if(err.code === 'P2025') {
          return res.status(404).send({ message: "product not found"})
        }
      }
      console.log(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
      await prisma.product.delete({ where: { id } })

      logger.info("User deleted product");
      return res.status(200).send({ message: "product deleted successfully" })
    } catch (err) {
      if(err instanceof Prisma.PrismaClientKnownRequestError) {
        if(err.code === 'P2025') {
          return res.status(404).send({ message: "product not found"})
        }
        if(err.code === 'P2003') {
          return res.status(409).send({ message: "Foreign key constraint failed"})
        }
      }
      console.log(err);
    }
  }
}

const selectFetch = {
  id: true,
  sku: true,
  name: true,
  stock: true,
  price: true,
  image: true,
  category: {
    select: { 
      id: true,
      name: true,
    },
  },
  createdAt: true,
  updatedAt: true
}

const selectDetail = {
  id: true,
  sku: true,
  name: true,
  stock: true,
  price: true,
  image: true,
  category: {
    select: { id: true,
      name: true,
    },
  },
  createdAt: true,
  updatedAt: true
}