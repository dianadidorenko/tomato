import express from "express";

import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cartController.js";

import authUser from "../middleware/authUser.js";

const cartRouter = express.Router();

cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/get", authUser, getCart);
cartRouter.post("/remove", authUser, removeFromCart);

export default cartRouter;
