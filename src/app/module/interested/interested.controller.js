import catchAsync from "../../../utils/catchAsync.js";
import { getAllInterestedBusinessByUserService, getAllInterestedUsersService, makeAnUserInterestedService } from "./interested.service.js";
import sendResponse from "../../../utils/sendResponse.js";



//api ending point to make an user interested
export const makeAnUserInterested = catchAsync(async (req,res) => {
    const newInterestedUser = await makeAnUserInterestedService(req.body);

    sendResponse(res,{
        statusCode: 201,
        success: true,
        message: "listed a user as interested to a business",
        data: newInterestedUser
    });
});


//get all interested user filter by a single Business
export const getInterestedUsersByBusiness = catchAsync(async (req,res) => {
    const allInterestedUsers = await getAllInterestedUsersService(req.query);

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "got all interested user",
        data: allInterestedUsers
    });
});


//get all interested business filter by user
export const getInterestedBusinessByUser = catchAsync(async (req,res) => {
    const allInterestedBusiness = await getAllInterestedBusinessByUserService(req.query);

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "got all interested business",
        data: allInterestedBusiness
    });
});
