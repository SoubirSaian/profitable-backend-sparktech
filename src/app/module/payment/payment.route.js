import express from "express";
import { cancelPage, postCheckout, successPage } from "./payment.controller.js";
import { authorizeUser } from "../../middleware/AuthMiddleware.js";

const paymentRouter = express.Router();

paymentRouter.get("/success", successPage);
paymentRouter.get("/cancel", cancelPage);
paymentRouter.post("/checkout", authorizeUser, postCheckout);

export default paymentRouter;