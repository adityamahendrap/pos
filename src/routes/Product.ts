import { Router } from "express";
import productController from "../controllers/Product";
import verifyUser from "../middlewares/verifyUser";
import isAdmin from "../middlewares/isAdmin";
const router = Router();

router.use(verifyUser);
router.get("/", productController.fetch); ///products?limit=10&skip=0
router.get("/:id", productController.detail);

router.use(isAdmin);
router.post("/", productController.create);
router.put("/:id", productController.update);
router.delete("/:id", productController.delete);

export default router;
