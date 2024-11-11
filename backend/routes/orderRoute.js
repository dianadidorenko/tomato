import express from "express";
import {
  listOrders,
  placeOrder,
  updateSTatus,
  userOrders,
  verifyOrder,
} from "../controllers/orderController.js";
import authUser from "../middleware/authUser.js";

const orderRouter = express.Router();

orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authUser, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateSTatus);

export default orderRouter;
