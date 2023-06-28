import { Router } from "express";
import categoryController from "../controllers/Category";
import verifyUser from "../middlewares/verifyUser";
import isAdmin from "../middlewares/isAdmin";
const router = Router();

router.use(verifyUser);
router.get("/", categoryController.fetch); ///categories?limit=10&skip=0
router.get("/:id", categoryController.detail);

router.use(isAdmin);
router.post("/", categoryController.create);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.delete);

export default router;
