"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function createOrder(reqBody, res) {
    try {
        const { userId, paymentId, name, products, receiptCode, totalPaid, totalPrice, totalReturn } = reqBody;
        // Calculate the total price for each product and the overall total price
        let overallTotalPrice = 0;
        const orderProducts = await Promise.all(products.map(async (product) => {
            const { productId, quantity } = product;
            const fetchedProduct = await prisma.product.findUnique({
                where: { id: productId },
            });
            if (!fetchedProduct) {
                throw new Error(`Product with ID ${productId} not found`);
            }
            const totalPrice = fetchedProduct.price * quantity;
            overallTotalPrice += totalPrice;
            return {
                productId,
                quantity,
                totalPrice,
            };
        }));
        // Create the order in the database
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
        return createdOrder;
    }
    catch (error) {
        throw new Error(`Failed to create order: ${error.message}`);
    }
}
exports.default = createOrder;
//# sourceMappingURL=Order.js.map