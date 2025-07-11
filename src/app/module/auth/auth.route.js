import express from "express";
import { forgetPassword, forgetPasswordVerifyOtp, loginUser, registerUser, resetPassword, verifyEmailSendOtp, verifyEmailVerifyOtp } from "./auth.controller.js";


const authRouter = express.Router();

//here have to add token authorization middleware.
//to check if token is available or not

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/verify-email", verifyEmailSendOtp);
authRouter.post("/verify-email-check-otp", verifyEmailVerifyOtp);
authRouter.post("/forget-password", forgetPassword);
authRouter.post("/forget-password-check-otp", forgetPasswordVerifyOtp);
authRouter.post("/reset-password", resetPassword);

export default authRouter;