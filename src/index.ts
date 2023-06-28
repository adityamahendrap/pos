import "dotenv/config";
import express, { Request, Response, NextFunction, Application } from "express";
import cors from "cors";
import logging from './middlewares/logging';
import errHandler from './middlewares/errHandler';
import authRoute from "./routes/Auth";
import userRoute from "./routes/User";
import categoryRoute from "./routes/Category";
import orderRoute from "./routes/Order";
import paymentRoute from "./routes/Payment";
import productRoute from "./routes/Product";

const app: Application = express();
const port = process.env.SERVER_PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use(logging)

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/products", productRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World");
});

app.use(errHandler)

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
