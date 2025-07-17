import express from "express";
import { updateUserProfile } from "./user.controller.js";

const userRouter = express.Router();

userRouter.post("/update-profile", updateUserProfile);

export default userRouter;