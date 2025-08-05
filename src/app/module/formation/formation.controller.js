import catchAsync from "../../../utils/catchAsync.js";
import sendResponse from "../../../utils/sendResponse.js";
import { createNewFormatService, deleteFormatservice, getAllFormationService, updateFormationService } from "./formation.service.js";




//api ending point to create a new format
export const createNewFormat = catchAsync( async (req,res) => {

    const result = await createNewFormatService(req);

    sendResponse(res,{
        statusCode: 201,
        success: true,
        message: "New formation created successfully",
        data: result
    })
});

//api ending point to get all formation
export const getAllFormation = catchAsync( async (req,res) => {

    const response = await getAllFormationService();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Successfully got all formation",
        data: response
    });

});

//api ending point 
export const updateFormation = catchAsync( async (req,res) => {

    const response = await updateFormationService(req);

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "Format updated successfully",
        data: response
    })
});

//api ending point to delete formation
export const deleteFormation = catchAsync( async (req,res) => {

    const response = await deleteFormatservice(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Format deleted successfully",
        data: response
    })
});