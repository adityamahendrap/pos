import "dotenv/config";
import express, { Request, Response, Application } from "express";
import cors from "cors";
import verifyUser from "./middlewares/verifyUser";
import logging from "./middlewares/logging";
import errHandler from "./middlewares/errHandler";
import authRoute from "./routes/auth";
import userRoute from "./routes/user";
import categoryRoute from "./routes/category";
import orderRoute from "./routes/order";
import paymentRoute from "./routes/payment";
import productRoute from "./routes/product";
import cacheHandler from './middlewares/cacheMiddleware';

const app: Application = express();
const port = process.env.SERVER_PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use(logging);

app.use("/api/auth", authRoute);
app.use(verifyUser);
app.use(cacheHandler);
app.use("/api/users", userRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/products", productRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World");
});

app.use(errHandler);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
