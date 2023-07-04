import { Request, Response, NextFunction } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import logger from '../utils/logger';
import randomstring from 'randomstring';
import setCache from "../utils/setCache";
import pagination from '../utils/pagination';
const prisma = new PrismaClient();

export default {
  fetch: async (req: Request, res: Response, next: NextFunction) => {
    const { limit, skip } = req.query
    
    try {
      const orders = await prisma.order.findMany({
        select: selectFetch,
        ...pagination.prisma(limit as string, skip as string)
      })
      const data = {
        ...pagination.meta(orders.length, limit as string, skip as string),
        orders
      }

      logger.info("User accessed orders");
      setCache(req, next, data)
      return res.status(200).send({ message: "Orders retrieved successfully", data})
    } catch (err) {
      console.log(err);
    }
  },

  detail: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    
    try {
      let order = await prisma.order.findUnique({
        where: { id },
        select: selectDetail
      })
      const orderFormat = {
        products: order.OrdersProducts,
        ...order
      }

      logger.info("User accessed order");
      setCache(req, next, orderFormat)
      return res.status(200).send({ message: "Order retrieved successfully", data: orderFormat})
    } catch (err) {
      console.log(err);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    const { userId, paymentId, name, products, totalPaid } = req.body;
    
    try {
      let overallTotalPrice: number = 0;
      const orderProducts = await Promise.all(
        products.map(async (product) => {
          const { productId, quantity } = product;
          const fetchedProduct = await prisma.product.findUnique({
            where: { id: productId },
          });
          const { stock, price } = fetchedProduct

          if (!fetchedProduct) {
            return res.status(404).send({ message: `Product with ID ${productId} not found` })
          }
          if(stock < quantity) {
            return res.status(400).send({ message: `Order with Product ID ${productId} exceeds available stock` })
          }
          if(quantity < 1) {
            return res.status(400).send({ message: `Quantity should be at least 1` })
          }
          
          const totalPrice: number = price * quantity;
          overallTotalPrice += totalPrice;
  
          return {
            productId,
            quantity,
            totalPrice,
          };
        })
      );
  
      if (totalPaid < overallTotalPrice) {
        return res.status(400).send({ message: "Insufficient payment amount"})
      }
      const totalReturn: number = totalPaid - overallTotalPrice
      const receiptCode: string = randomstring.generate({ charset: 'numeric' })
      logger.info(receiptCode);
  
      const createdOrder = await prisma.order.create({
        data: {
          userId,
          paymentId,
          name,
          totalPrice: overallTotalPrice,
          totalPaid,
          totalReturn,
          receiptCode,
          products: {
            create: orderProducts,
          },
        },
      });

      products.forEach(async (product) => {
        const { productId, quantity } = product;
        const fetchedProduct = await prisma.product.findUnique({
          where: { id: productId },
          select: { stock: true },
        });
      
        const { stock } = fetchedProduct;      
        const updatedProduct = await prisma.product.update({
          where: { id: productId },
          data: { stock: stock - quantity },
        });
      });
  
      logger.info('User created a order');
      return res.status(201).send({ message: "Order created"})
    } catch (err) {
      console.log(err);
    }
  },

  cancel: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
      const order = await prisma.order.findUnique({ where: { id } })
      if(!order) {
        return res.status(404).send({ message: "Order not found" })
      }

      const ordersProducts = await prisma.orderProduct.findMany({ where: { orderId: order.id }})
      const productIds = ordersProducts.map((orderProduct) => orderProduct.productId); 
      const products = await prisma.product.findMany({ where: { id: { in: productIds } } });

      const restoreStock = await Promise.all(
        products.map(async (product) => {
          const orderProduct = ordersProducts.find((orderProduct) => orderProduct.productId === product.id);
          const quantity = orderProduct.quantity;
          const stock = product.stock;

          await prisma.product.update({
            where: { id: product.id },
            data: { stock: stock + quantity },
          });
        })
      )
      await prisma.order.delete({ where: { id } })

      // ordersProducts.forEach(async (orderProduct) => {
      //   const { productId, quantity } = orderProduct
      //   const product = await prisma.product.findUnique({ where: { id: productId } })
      //   const { stock } = product

      //   const restoreStock = prisma.product.update({
      //     where: { id: productId },
      //     data: { stock:  stock + quantity}
      //   })
      // });

      logger.info("User canceled order");
      return res.status(200).send({ message: "Order canceled" })
    } catch (err) {
      console.log(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    
    try {
      await prisma.order.delete({ where: { id } })
      
      logger.info("User deleted order");
      return res.status(200).send({ message: "Order deleted successfully" })
    } catch (err) {
      if(err instanceof Prisma.PrismaClientKnownRequestError) {
        if(err.code === 'P2025') {
          return res.status(404).send({ message: "Order not found"})
        }
      }
      console.log(err);
    }
  }
}

const selectFetch = {
  id: true,
  name: true,
  userId: true,
  payment: {
    select: {
      id: true,
      name: true,
      type: true
    }
  },
  totalPrice: true,
  totalPaid: true,
  totalReturn: true,
  receiptCode: true
}

const selectDetail = {
  id: true,
  name: true,
  userId: true,
  payment: {
    select: {
      id: true,
      name: true,
      type: true
    }
  },
  OrdersProducts: {
    select: {
      productId: true,
      totalPrice: true,
      quantity: true
    }
  },
  totalPrice: true,
  totalPaid: true,
  totalReturn: true,
  receiptCode: true
}