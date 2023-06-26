import { Request, Response, NextFunction } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import IOrder from '../interfaces/IOrder';
import IOrdersProducts from '../interfaces/IOrdersProducts';
const prisma = new PrismaClient();

export default {
  fetch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await prisma.order.findMany({})
      const count: number = orders.length

      console.log("User accessed orders");
      return res.status(200).send({ message: "orders retrieved successfully", count, data: orders})
    } catch (err) {
      console.log(err);
    }
  },

  detail: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    
    try {
      const order = await prisma.order.findUnique({
        where: { id },
        include: { 
          OrdersProducts: { 
            include: { 
              product: true 
            } 
          } 
        },
      });
      
      if (!order) {
        return res.status(404).send({ message: `Order not found` });
      }
      
      const { id: orderId, name, totalPrice, totalPaid, totalReturn, receiptCode, OrdersProducts } = order;
      
      const products = OrdersProducts.map((orderProduct) => {
        const { id: productId, quantity } = orderProduct;
        const { id, sku, name, stock, price, categoryId, image } = orderProduct.product;
        return { id, name, price, quantity };
      });
      
      const detailOrder = {
        orderId,
        name,
        totalPrice,
        totalPaid,
        totalReturn,
        receiptCode,
        products,
      };

      console.log("User accessed order");
      return res.status(200).send({ message: "Order retrieved successfully", data: detailOrder})
    } catch (err) {
      console.log(err);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, paymentId, name, products, receiptCode, totalPaid, totalPrice } = req.body;
  
      let overallTotalPrice: number = 0;
      const orderProducts: IOrdersProducts[] = await Promise.all(
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
  
      const createdOrder = await prisma.order.create({
        data: {
          userId,
          paymentId,
          name,
          totalPrice: overallTotalPrice,
          totalPaid,
          totalReturn,
          receiptCode,
          OrdersProducts: {
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
  
      console.log('User created a order');
      res.status(201).send({ message: "Order created"})
    } catch (err) {
      console.log(err);
    }
  },

  cancel: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
      const order = await prisma.order.findUnique({ where: { id } })
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

      console.log("User canceled order");
      return res.status(200).send({ message: "Order canceled" })
    } catch (err) {
      console.log(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    
    try {
      await prisma.order.delete({
        where: { id }
      })
      console.log("User deleted order");
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
