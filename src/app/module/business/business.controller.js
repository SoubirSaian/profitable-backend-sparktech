import catchAsync from "../../../utils/catchAsync.js";
import { createNewBusinessService, getAllBusinessService, getASingleBusinessByIdService, updateABusinessService, advancedSearchService, getBusinessValuationService } from "./business.service.js";


//api ending point to create a new business
export const createNewBusiness = catchAsync(async (req,res) => {
    const newBusiness = await createNewBusinessService(req.body);


    sendResponse(res, {
        statusCode: 200,
        success: false,
        message: "new business created successfully",
        data: newBusiness
    });
});

//api ending point to update a business
export const updateABusiness = catchAsync(async (req,res) => {

     await updateABusinessService(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: false,
        message: "new business updated successfully",
       
    });
});

//api ending point to get all business
export const getAllBusiness = catchAsync(async (req,res) => {
    const allBusness = await getAllBusinessService()

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "got all listed business",
        data: allBusness
    });
});

//api ending point to get a single business
export const getASingleBusiness = catchAsync(async (req,res) => {
    const business = await getASingleBusinessByIdService(req.params);

    sendResponse(res,{
        statusCode: 200,
        success: true,
        data : business
    });
});

//api ending point to implement advanced search
export const advancedBusinessSearch = catchAsync(async (req,res) => {

    const searchResult = await advancedSearchService(req.body);

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "Advanced search implemented successfully",
        data: searchResult
    });
});

//api ending point to implement business valuation
export const getBusinessValuation = catchAsync(async (req,res) => {

    await getBusinessValuationService(req.body)

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "Your information submitted to get valuation"
    });
});