import ApiError from "../../../error/ApiError.js";
import catchAsync from "../../../utils/catchAsync.js";
import sendResponse from "../../../utils/sendResponse.js";
import BusinessModel from "../business/business.model.js";




//api ending point to perform search from home page
export const homePageSearch = catchAsync(
    async (req,res) => {
        const { searchText } = req.query;
        if(!searchText){
            throw new ApiError(400, "Search text is required to perform search");
        }


        //$regex: searchTerm → Matches titles that contain the given term.
        //$options: "i" → Makes it case-insensitive (so "Coffee" matches "coffee").
        const response = await BusinessModel.aggregate([
           {
            $match: {
                title: { $regex: searchText, $options: "i" }
            }
           } 
        ]);


        sendResponse(res,{
            statusCode: 200,
            success: true,
            message: "Got data after searching",
            data: response
        })

    }
);