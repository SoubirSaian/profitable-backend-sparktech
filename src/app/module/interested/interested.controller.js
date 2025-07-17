import catchAsync from "../../../utils/catchAsync.js";
import { getAllInterestedUsersService, makeAnUserInterestedService } from "./interested.service.js";
import sendResponse from "../../../utils/sendResponse.js";



//api ending point to make an user interested
export const makeAnUserInterested = catchAsync(async (req,res) => {
    const newInterestedUser = await makeAnUserInterestedService(req.body);

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "listed user as interested",
        data: newInterestedUser
    });
});


//get all interested user filter by a single Business
export const getInterestedUsersByBusiness = catchAsync(async (req,res) => {
    const allInterestedUsers = await getAllInterestedUsersService(req.body);

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "got all interested user",
        data: allInterestedUsers
    });
});
