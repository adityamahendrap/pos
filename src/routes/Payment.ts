import { Router } from "express";
import paymentController from "../controllers/Payment";
import verifyUser from "../middlewares/verifyUser";
import isAdmin from "../middlewares/isAdmin";
const router = Router();

router.use(verifyUser);
router.get("/", paymentController.fetch); ///payments?limit=10&skip=0
router.get("/:id", paymentController.detail);

router.use(isAdmin);
router.post("/", paymentController.create);
router.put("/:id", paymentController.update);
router.delete("/:id", paymentController.delete);

export default router;
