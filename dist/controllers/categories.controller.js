"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.default = {
    fetch: async (req, res, next) => {
        try {
            const categories = await prisma.category.findMany({});
            const count = categories.length;
            console.log("User accessed categories");
            return res.status(200).send({ message: "Categories retrieved successfully", count, data: categories });
        }
        catch (err) {
            console.log(err);
        }
    },
    detail: async (req, res, next) => {
        const { id } = req.params;
        try {
            const category = await prisma.category.findUnique({
                where: { id }
            });
            console.log("User accessed category");
            return res.status(200).send({ message: "Category retrieved successfully", data: category });
        }
        catch (err) {
            console.log(err);
        }
    },
    create: async (req, res, next) => {
        const { name } = req.body;
        try {
            await prisma.category.create({
                data: { name }
            });
            console.log('User created a category');
            return res.status(201).send({ message: "Category created" });
        }
        catch (err) {
            console.log(err);
        }
    },
    update: async (req, res, next) => {
        const { name } = req.body;
        const { id } = req.params;
        try {
            await prisma.category.update({
                where: { id },
                data: { name }
            });
            console.log("User updated category");
            return res.status(201).send({ message: "Category updated successfully" });
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (err.code === 'P2025') {
                    return res.status(404).send({ message: "Category not found" });
                }
            }
            console.log(err);
        }
    },
    delete: async (req, res, next) => {
        const { id } = req.params;
        try {
            await prisma.category.delete({
                where: { id }
            });
            console.log("User deleted category");
            return res.status(200).send({ message: "Category deleted successfully" });
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (err.code === 'P2025') {
                    return res.status(404).send({ message: "Category not found" });
                }
            }
            console.log(err);
        }
    }
};
//# sourceMappingURL=categories.controller.js.map