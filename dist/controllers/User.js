"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.default = {
    fetch: async (req, res, next) => {
        try {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true
                }
            });
            const count = users.length;
            console.log("User accessed users");
            return res.status(200).send({ message: "Users retrieved successfully", count, data: users });
        }
        catch (err) {
            console.log(err);
        }
    },
    detail: async (req, res, next) => {
        const { id } = req.params;
        try {
            const user = await prisma.user.findUnique({
                where: { id }
            });
            if (!user) {
                return res.status(404).send('User not found');
            }
            console.log("User accessed user");
            return res.status(200).send({ message: "User retrieved successfully", data: user });
        }
        catch (err) {
            console.log(err);
        }
    },
    update: async (req, res, next) => {
        const { id } = req.params;
        const { name, role, isVerify } = req.body;
        try {
            await prisma.user.update({
                where: { id },
                data: { name, role, isVerify }
            });
            console.log("User updated user");
            return res.status(201).send({ message: "User updated successfully" });
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (err.code === 'P2025') {
                    return res.status(404).send({ message: "User not found" });
                }
            }
            console.log(err);
        }
    },
    delete: async (req, res, next) => {
        const { id } = req.params;
        try {
            await prisma.user.delete({
                where: { id }
            });
            console.log("User deleted user");
            return res.status(200).send({ message: "User deleted successfully" });
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (err.code === 'P2025') {
                    return res.status(404).send({ message: "User not found" });
                }
            }
            console.log(err);
        }
    },
};
//# sourceMappingURL=User.js.map