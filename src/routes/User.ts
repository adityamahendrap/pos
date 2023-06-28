import { Router } from "express";
import userController from "../controllers/User";
import verifyUser from "../middlewares/verifyUser";
import isAdmin from "../middlewares/isAdmin";
const router = Router();

router.use(verifyUser);
router.use(isAdmin);
router.get("/", userController.fetch);
router.get("/:id", userController.detail);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;
