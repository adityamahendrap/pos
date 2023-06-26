import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import "dotenv/config";
import authRoute from "./routes/Auth";
import userRoute from "./routes/User";
import categoryRoute from "./routes/Category";
import orderRoute from "./routes/Order";
import paymentRoute from "./routes/Payment";
import productRoute from "./routes/Product";

const app: Express = express();
const port = process.env.SERVER_PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/products", productRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("hello world");
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
