"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const categories_route_1 = __importDefault(require("./routes/categories.route"));
const orders_route_1 = __importDefault(require("./routes/orders.route"));
const payments_route_1 = __importDefault(require("./routes/payments.route"));
const products_route_1 = __importDefault(require("./routes/products.route"));
const app = (0, express_1.default)();
const port = process.env.SERVER_PORT ?? 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/auth", auth_route_1.default);
app.use("/api/users", users_route_1.default);
app.use("/api/categories", categories_route_1.default);
app.use("/api/orders", orders_route_1.default);
app.use("/api/payments", payments_route_1.default);
app.use("/api/products", products_route_1.default);
app.get("/", (req, res) => {
    res.status(200).send("hello world");
});
app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map