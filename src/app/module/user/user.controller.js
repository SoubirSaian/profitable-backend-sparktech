import catchAsync from "../../../utils/catchAsync.js";
import sendResponse from "../../../utils/sendResponse.js";
import { getAllUserService, getUserDetailsService, sellerDetailService, userProfileUpdateService, usersTotalListedBusinessService } from "./user.service.js";


//api ending point to update user
export const getUserDetails = catchAsync( async (req,res) => {
   
    const response = await getUserDetailsService(req.user);

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "User details got successfully",
        data: response
    });
});

//api ending point to update user
export const updateUserProfile = catchAsync( async (req,res) => {
   
    const updatedUser = await userProfileUpdateService(req);

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "User updated successfully",
        data: updatedUser
    });
});

//api ending point to update user
export const getSellerDetail = catchAsync( async (req,res) => {
   
    const response = await sellerDetailService(req);

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "Got seller detail",
        data: response
    });
});

//dashboard

//api ending point to get all user
export const getAllUsers = catchAsync( async (req,res) => {
   
    const response = await getAllUserService();

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "Got all user",
        data: response
    });
});

//api ending point to get user's total listed business
export const getUsersTotalListedBusiness = catchAsync( async (req,res) => {
   
    const response = await usersTotalListedBusinessService(req.query);

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "Got userr's total listed business with statistics",
        data: response
    });
});

