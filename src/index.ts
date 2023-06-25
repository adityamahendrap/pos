import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import "dotenv/config";
import authRoute from "./routes/auth.route";
import usersRoute from "./routes/users.route";
import categoriesRoute from "./routes/categories.route";
import ordersRoute from "./routes/orders.route";
import paymentsRoute from "./routes/payments.route";
import productsRoute from "./routes/products.route";

const app: Express = express();
const port = process.env.SERVER_PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/payments", paymentsRoute);
app.use("/api/products", productsRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("hello world");
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
