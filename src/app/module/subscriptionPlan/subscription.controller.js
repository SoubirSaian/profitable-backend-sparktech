import catchAsync from "../../../utils/catchAsync.js";
import {postNewSubscriptionPlanService, getAllSubscriptionPlanByUserRoleService, getSingleSubscriptionPlanService } from "./subscriptrion.service.js";
import sendResponse from "../../../utils/sendResponse.js";

//api ending point to create a subscription plan
export const createSubscriptionPlan = catchAsync( async (req,res) => {

    const newPlan = await postNewSubscriptionPlanService(req.body);

    sendResponse(res,{
        statusCode: 201,
        success: true,
        message: "Subscription plan created",
        data: newPlan
    })
});

//api ending point to get all subscription based on user role
export const getAllSubscriptionPlanByUserRole = catchAsync( async (req,res) =>{

    const allPlan = await getAllSubscriptionPlanByUserRoleService(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Got all subscription plan",
        data: allPlan
    });
} );

//api ending point to get single subscription plan
export const getSingleSubscriptionPlan = catchAsync( async (req,res) =>{

    const allPlan = await getSingleSubscriptionPlanService(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Got single subscription plan",
        data: allPlan
    });
} );