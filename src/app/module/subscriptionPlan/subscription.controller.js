import catchAsync from "../../../utils/catchAsync.js";
import {postNewSubscriptionPlanService, getAllSubscriptionPlanByUserRoleService } from "./subscriptrion.service.js";
import sendResponse from "../../../utils/sendResponse.js";

//api ending point to create a subscription plan
export const createSubscriptionPlan = catchAsync( async (req,res) => {

    const newPlan = await postNewSubscriptionPlanService(req.user,req.body);

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "Subscription plan created",
        data: newPlan
    })
});

//api ending point to get all subscription based on user role
export const getAllSubscriptionPlanByUserRole = catchAsync( async (req,res) =>{

    const allPlan = await getAllSubscriptionPlanByUserRoleService(req.user);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Got all subscription plan",
        data: allPlan
    });
} );