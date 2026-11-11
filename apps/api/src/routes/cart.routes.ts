import { Router } from "express";
import { getCart, mergeCart, putCart } from "../controllers/cart.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);
router.get("/", getCart);
router.put("/", putCart);
router.post("/merge", mergeCart);

export default router;
