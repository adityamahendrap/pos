"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.default = {
    fetch: async (req, res, next) => {
        try {
            const payments = await prisma.payment.findMany({});
            const count = payments.length;
            console.log("User accessed payments");
            return res.status(200).send({ message: "Payments retrieved successfully", count, data: payments });
        }
        catch (err) {
            console.log(err);
        }
    },
    detail: async (req, res, next) => {
        const { id } = req.params;
        try {
            const payment = await prisma.payment.findUnique({
                where: { id }
            });
            if (!payment) {
                return res.status(404).send('Payment not found');
            }
            console.log("User accessed payment");
            return res.status(200).send({ message: "Payment retrieved successfully", data: payment });
        }
        catch (err) {
            console.log(err);
        }
    },
    create: async (req, res, next) => {
        const { name, type, logo } = req.body;
        try {
            await prisma.payment.create({
                data: { name, type, logo }
            });
            console.log('User created a payment');
            return res.status(201).send({ message: "Payment created" });
        }
        catch (err) {
            console.log(err);
        }
    },
    update: async (req, res, next) => {
        const { name, type, logo } = req.body;
        const { id } = req.params;
        try {
            await prisma.payment.update({
                where: { id },
                data: { name, type, logo }
            });
            console.log("User updated payment");
            return res.status(201).send({ message: "Payment updated successfully" });
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (err.code === 'P2025') {
                    return res.status(404).send({ message: "Payment not found" });
                }
            }
            console.log(err);
        }
    },
    delete: async (req, res, next) => {
        const { id } = req.params;
        try {
            await prisma.payment.delete({
                where: { id }
            });
            console.log("User deleted payment");
            return res.status(200).send({ message: "Payment deleted successfully" });
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (err.code === 'P2025') {
                    return res.status(404).send({ message: "Payment not found" });
                }
                if (err.code === 'P2003') {
                    return res.status(409).send({ message: "Foreign key constraint failed" });
                }
            }
            console.log(err);
        }
    }
};
//# sourceMappingURL=Payment.js.map