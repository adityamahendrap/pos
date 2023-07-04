import { Router } from "express";
import paymentController from "../controllers/payment";
import isAdmin from "../middlewares/isAdmin";
const router = Router();

router.get("/", paymentController.fetch); ///payments?limit=10&skip=0
router.get("/:id", paymentController.detail);

router.use(isAdmin);
router.post("/", paymentController.create);
router.put("/:id", paymentController.update);
router.delete("/:id", paymentController.delete);

export default router;
