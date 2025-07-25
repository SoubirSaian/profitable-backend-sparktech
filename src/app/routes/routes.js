import express from "express";
import authRouter from "../module/auth/auth.route.js";
import subscriptionRouter from "../module/subscriptionPlan/subscription.route.js";
import paymentRouter from "../module/payment/payment.route.js";


const allRouter = express.Router();

const moduleRoutes = [
    {
        path: "/auth",
        router: authRouter
    },
    {
        path: "/subscription",
        router: subscriptionRouter
    },
    {
        path: "/payment",
        router: paymentRouter
    },
    

];

moduleRoutes.forEach((route) => allRouter.use(route.path,route.router));

export default allRouter;