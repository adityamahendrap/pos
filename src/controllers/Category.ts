import { Request, Response, NextFunction } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  fetch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await prisma.category.findMany({})
      const count: number = categories.length

      console.log("User accessed categories");
      return res.status(200).send({ message: "Categories retrieved successfully", count, data: categories})
    } catch (err) {
      console.log(err);
    }
  },

  detail: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    
    try {
      const category = await prisma.category.findUnique({
        where: { id }
      })
      if(!category) {
        return res.status(404).send('Category not found')
      }
      console.log("User accessed category");
      return res.status(200).send({ message: "Category retrieved successfully", data: category})
    } catch (err) {
      console.log(err);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    const { name }: { name: string } = req.body

    try {
      await prisma.category.create({
        data: { name }
      })

      console.log('User created a category');
      return res.status(201).send({ message: "Category created"})
    } catch (err) {
      console.log(err);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    const { name }: { name: string } = req.body
    const { id } = req.params
    
    try {
      await prisma.category.update({
        where: { id },
        data: { name }
      })

      console.log("User updated category");
      return res.status(201).send({ message: "Category updated successfully" })
    } catch (err) {
      if(err instanceof Prisma.PrismaClientKnownRequestError) {
        if(err.code === 'P2025') {
          return res.status(404).send({ message: "Category not found"})
        }
      }
      console.log(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
      await prisma.category.delete({
        where: { id }
      })
      console.log("User deleted category");
      return res.status(200).send({ message: "Category deleted successfully" })
    } catch (err) {
      if(err instanceof Prisma.PrismaClientKnownRequestError) {
        if(err.code === 'P2025') {
          return res.status(404).send({ message: "Category not found"})
        }
      }
      console.log(err);
    }
  }
}
