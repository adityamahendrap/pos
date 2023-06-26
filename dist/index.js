"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const Auth_1 = __importDefault(require("./routes/Auth"));
const User_1 = __importDefault(require("./routes/User"));
const Category_1 = __importDefault(require("./routes/Category"));
const Order_1 = __importDefault(require("./routes/Order"));
const Payment_1 = __importDefault(require("./routes/Payment"));
const Product_1 = __importDefault(require("./routes/Product"));
const app = (0, express_1.default)();
const port = process.env.SERVER_PORT ?? 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/auth", Auth_1.default);
app.use("/api/users", User_1.default);
app.use("/api/categories", Category_1.default);
app.use("/api/orders", Order_1.default);
app.use("/api/payments", Payment_1.default);
app.use("/api/products", Product_1.default);
app.get("/", (req, res) => {
    res.status(200).send("hello world");
});
app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map