import express from "express";
import { createSubscriptionPlan, getAllSubscriptionPlanByUserRole } from "./subscription.controller.js";


const subscriptionRouter = express.Router();

subscriptionRouter.post("/create", createSubscriptionPlan);
subscriptionRouter.get("/getSubscriptionPlan", getAllSubscriptionPlanByUserRole);


export default subscriptionRouter;