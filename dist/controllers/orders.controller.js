"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.default = {
    fetch: async (req, res, next) => {
        try {
            const orders = await prisma.order.findMany({});
            const count = orders.length;
            console.log("User accessed orders");
            return res.status(200).send({ message: "orders retrieved successfully", count, data: orders });
        }
        catch (err) {
            console.log(err);
        }
    },
    detail: async (req, res, next) => {
        const { id } = req.params;
        try {
            const order = await prisma.order.findUnique({
                where: { id }
            });
            console.log("User accessed order");
            return res.status(200).send({ message: "order retrieved successfully", data: order });
        }
        catch (err) {
            console.log(err);
        }
    },
    create: async (req, res, next) => {
        const { userId, paymentId, name, totalPrice, totalPaid, totalReturn, receiptCode } = req.body;
        try {
            await prisma.order.create({
                data: { userId, paymentId, name, totalPrice, totalPaid, totalReturn, receiptCode }
            });
            console.log('User created a order');
            return res.status(201).send({ message: "order created" });
        }
        catch (err) {
            console.log(err);
        }
    },
    delete: async (req, res, next) => {
        const { id } = req.params;
        try {
            await prisma.order.delete({
                where: { id }
            });
            console.log("User deleted order");
            return res.status(200).send({ message: "order deleted successfully" });
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (err.code === 'P2025') {
                    return res.status(404).send({ message: "order not found" });
                }
            }
            console.log(err);
        }
    }
};
//# sourceMappingURL=orders.controller.js.map