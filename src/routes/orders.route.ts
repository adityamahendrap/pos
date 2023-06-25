import { Router } from "express";
const router = Router();

router.get("/"); ///orders?limit=10&skip=0
router.get("/:id");
router.post("/");

export default router;
