import express from "express";
import { cancelPage, postCheckout, successPage } from "./payment.controller.js";


const paymentRouter = express.Router();

paymentRouter.get("/success", successPage);
paymentRouter.get("/cancel", cancelPage);
paymentRouter.post("/checkout", postCheckout);

export default paymentRouter;