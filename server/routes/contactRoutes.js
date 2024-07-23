import express from "express";
const router = express.Router();
import {
  Addmessages,
  getALLmessages,
} from "../controllers/contactControllers.js";
import makepayment from "../controllers/paymentController.js";
router.post("/messages", Addmessages);
router.get("/messages", getALLmessages);
router.post("/payment",makepayment);
export default router;
