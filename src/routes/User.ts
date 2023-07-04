import { Router } from "express";
import userController from "../controllers/user";
import isAdmin from "../middlewares/isAdmin";
const router = Router();

router.use(isAdmin);
router.get("/", userController.fetch);
router.get("/:id", userController.detail);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;
