import express from "express"
import { createNewCoupon, deleteCoupon, getAllCoupon, updateCoupon } from "./coupon.controller.js";


const couponRouter = express.Router();

couponRouter.post("/create", createNewCoupon);
couponRouter.get("/all-coupon", getAllCoupon);
couponRouter.put("/update-coupon", updateCoupon);
couponRouter.delete("/delete-coupon", deleteCoupon);

export default couponRouter;