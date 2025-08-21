import express from "express";
import { createSubscriptionPlan, getAllSubscriptionPlanByUserRole, getSingleSubscriptionPlan, updateSubscriptionPlan } from "./subscription.controller.js";


const subscriptionRouter = express.Router();

subscriptionRouter.post("/create-subscription", createSubscriptionPlan);
subscriptionRouter.patch("/update-subscription", updateSubscriptionPlan);
subscriptionRouter.get("/get-subscription-plan", getAllSubscriptionPlanByUserRole);
subscriptionRouter.get("/get-single-subscription-plan", getSingleSubscriptionPlan);


export default subscriptionRouter;