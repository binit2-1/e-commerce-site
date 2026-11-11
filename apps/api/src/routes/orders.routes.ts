import { Router } from "express";
import { createOrder, getOrder, listOrders } from "../controllers/orders.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);
router.post("/", createOrder);
router.get("/", listOrders);
router.get("/:id", getOrder);

export default router;
