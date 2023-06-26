"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.default = {
    fetch: async (req, res, next) => {
        try {
            const products = await prisma.product.findMany({});
            const count = products.length;
            console.log("User accessed products");
            return res.status(200).send({ message: "Products retrieved successfully", count, data: products });
        }
        catch (err) {
            console.log(err);
        }
    },
    detail: async (req, res, next) => {
        const { id } = req.params;
        try {
            const product = await prisma.product.findUnique({
                where: { id }
            });
            console.log("User accessed product");
            return res.status(200).send({ message: "product retrieved successfully", data: product });
        }
        catch (err) {
            console.log(err);
        }
    },
    create: async (req, res, next) => {
        const { sku, name, stock, price, categoryId, image } = req.body;
        try {
            await prisma.product.create({
                data: { sku, name, stock, price, categoryId, image }
            });
            console.log('User created a product');
            return res.status(201).send({ message: "product created" });
        }
        catch (err) {
            console.log(err);
        }
    },
    update: async (req, res, next) => {
        const { sku, name, stock, price, categoryId, image } = req.body;
        const { id } = req.params;
        try {
            await prisma.product.update({
                where: { id },
                data: { sku, name, stock, price, categoryId, image }
            });
            console.log("User updated product");
            return res.status(201).send({ message: "product updated successfully" });
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (err.code === 'P2025') {
                    return res.status(404).send({ message: "product not found" });
                }
            }
            console.log(err);
        }
    },
    delete: async (req, res, next) => {
        const { id } = req.params;
        try {
            await prisma.product.delete({
                where: { id }
            });
            console.log("User deleted product");
            return res.status(200).send({ message: "product deleted successfully" });
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (err.code === 'P2025') {
                    return res.status(404).send({ message: "product not found" });
                }
            }
            console.log(err);
        }
    }
};
//# sourceMappingURL=products.controller.js.map