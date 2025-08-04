import catchAsync from "../../../utils/catchAsync.js";
import sendResponse from "../../../utils/sendResponse.js";
import { userProfileUpdateService } from "./user.service.js";


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