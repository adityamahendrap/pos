import { Router } from "express";
import orderController from "../controllers/Order";
import verifyUser from "../middlewares/verifyUser";
import isAdmin from "../middlewares/isAdmin";
const router = Router();

router.use(verifyUser);
router.get("/", orderController.fetch); ///orders?limit=10&skip=0
router.get("/:id", orderController.detail);
router.post("/", orderController.create);

router.use(isAdmin);
router.delete("/:id", orderController.delete);
router.delete("/cancel/:id", orderController.cancel);

export default router;
