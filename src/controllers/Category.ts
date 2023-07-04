import { Request, Response, NextFunction } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import logger from "../utils/logger";
import pagination from "../utils/pagination";
import setCache from "../utils/setCache";
const prisma = new PrismaClient();

export default {
  fetch: async (req: Request, res: Response, next: NextFunction) => {
    const { limit, skip } = req.query;

    try {
      const categories = await prisma.category.findMany({
        ...pagination.prisma(limit as string, skip as string),
      });
      const data = {
        ...pagination.meta(categories.length, limit as string, skip as string),
        categories,
      };

      logger.info("User accessed categories");
      setCache(req, next, data)
      return res.status(200).send({ message: "Categories retrieved successfully", data });
    } catch (err) {
      next(err);
    }
  },

  detail: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const category = await prisma.category.findUnique({ where: { id } });
      if (!category) {
        return res.status(404).send("Category not found");
      }

      logger.info("User accessed category");
      setCache(req, next, category)
      return res.status(200).send({ message: "Category retrieved successfully", data: category });
    } catch (err) {
      next(err);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    try {
      await prisma.category.create({ data: { name } });

      logger.info("User created a category");
      return res.status(201).send({ message: "Category created" });
    } catch (err) {
      next(err);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const { id } = req.params;

    try {
      await prisma.category.update({
        where: { id },
        data: { name },
      });

      logger.info("User updated category");
      return res.status(201).send({ message: "Category updated successfully" });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
          return res.status(404).send({ message: "Category not found" });
        }
      }
      next(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      await prisma.category.delete({ where: { id } });
      logger.info("User deleted category");
      return res.status(200).send({ message: "Category deleted successfully" });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
          return res.status(404).send({ message: "Category not found" });
        }
      }
      next(err);
    }
  },
};
