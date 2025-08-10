import express from "express";
import { createSubscriptionPlan, getAllSubscriptionPlanByUserRole } from "./subscription.controller.js";


const subscriptionRouter = express.Router();

subscriptionRouter.post("/create-subscription", createSubscriptionPlan);
subscriptionRouter.get("/get-subscription-plan", getAllSubscriptionPlanByUserRole);


export default subscriptionRouter;