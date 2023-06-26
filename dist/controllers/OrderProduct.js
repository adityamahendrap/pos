"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.default = {
    fetch: async (req, res, next) => {
        try {
            const ordersProducts = await prisma.orderProduct.findMany({});
            const count = ordersProducts.length;
            console.log("User accessed ordersProducts");
            return res.status(200).send({ message: "ordersProducts retrieved successfully", count, data: ordersProducts });
        }
        catch (err) {
            console.log(err);
        }
    },
    detail: async (req, res, next) => {
        const { id } = req.params;
        try {
            const orderProduct = await prisma.orderProduct.findUnique({
                where: { id }
            });
            if (!orderProduct) {
                return res.status(404).send('orderProduct not found');
            }
            console.log("User accessed orderProduct");
            return res.status(200).send({ message: "orderProduct retrieved successfully", data: orderProduct });
        }
        catch (err) {
            console.log(err);
        }
    },
    create: async (req, res, next) => {
        const { name } = req.body;
        try {
            await prisma.orderProduct.create({
                data: { name }
            });
            console.log('User created a orderProduct');
            return res.status(201).send({ message: "orderProduct created" });
        }
        catch (err) {
            console.log(err);
        }
    },
    update: async (req, res, next) => {
        const { name } = req.body;
        const { id } = req.params;
        try {
            await prisma.orderProduct.update({
                where: { id },
                data: { name }
            });
            console.log("User updated orderProduct");
            return res.status(201).send({ message: "orderProduct updated successfully" });
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (err.code === 'P2025') {
                    return res.status(404).send({ message: "orderProduct not found" });
                }
            }
            console.log(err);
        }
    },
    delete: async (req, res, next) => {
        const { id } = req.params;
        try {
            await prisma.orderProduct.delete({
                where: { id }
            });
            console.log("User deleted orderProduct");
            return res.status(200).send({ message: "orderProduct deleted successfully" });
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (err.code === 'P2025') {
                    return res.status(404).send({ message: "orderProduct not found" });
                }
            }
            console.log(err);
        }
    }
};
//# sourceMappingURL=OrderProduct.js.map