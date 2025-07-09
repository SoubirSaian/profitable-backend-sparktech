import express from "express";
import authRouter from "../module/auth/auth.route.js";


const allRouter = express.Router();

const moduleRoutes = [
    {
        path: "/auth",
        router: authRouter
    },

];

moduleRoutes.forEach((route) => allRouter.use(route.path,route.router));

export default allRouter;