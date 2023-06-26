import { Router } from "express";
const router = Router();
import orderController from '../controllers/Order';

router.get("/", orderController.fetch); ///orders?limit=10&skip=0
router.get("/:id", orderController.detail);
router.post("/", orderController.create);
router.delete("/:id", orderController.delete);
router.delete("/cancel/:id", orderController.cancel);

export default router;
