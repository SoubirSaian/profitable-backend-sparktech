import ApiError from "../../../error/ApiError.js";
import catchAsync from "../../../utils/catchAsync.js";
import sendResponse from "../../../utils/sendResponse.js";
import NDAModel from "./nda.model.js";




//api ending point to retrieve nda data
export const getNdaFilteredByUserRole = catchAsync(

    async (req,res) => {

        const { role } = req.user.role;
        if(!role) throw new ApiError(400, "Role is required to filter nda");

        const response = await NDAModel.findOne( {role: role} );
        if(!response) throw new ApiError(404, "Not found NDA");

        sendResponse(res,{
            statusCode: 400,
            success: false,
            message: "Got NDA data",
            data: response
        })
    }
);