import { Request, Response, NextFunction } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  fetch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await prisma.product.findMany({})
      const count: number = products.length

      console.log("User accessed products");
      return res.status(200).send({ message: "Products retrieved successfully", count, data: products})
    } catch (err) {
      console.log(err);
    }
  },

  detail: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    
    try {
      const product = await prisma.product.findUnique({
        where: { id }
      })
      if(!product) {
        return res.status(404).send({ message: 'Product not found' })
      }
      console.log("User accessed product");
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

      console.log('User created a product');
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

      console.log("User updated product");
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
      await prisma.product.delete({
        where: { id }
      })
      console.log("User deleted product");
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
      res.send(err)
    }
  }
}
