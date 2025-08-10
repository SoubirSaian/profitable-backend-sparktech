import { log } from "console";
import catchAsync from "../../../utils/catchAsync.js";
import sendResponse from "../../../utils/sendResponse.js";
import validateFields from "../../../utils/validateFields.js";
import Agreement from "./agreement.model.js";




export const createNewAgreement = catchAsync(
    async (req,res) => {
        
        const {userId,role} = req.user;
        const files = req.files
        const { name,email,phone,nidPassportNumber } = req.body;
        validateFields(req.body,["name","email","phone","nidPassportNumber"]);
        
        //handle file name from files
        const file1 = files[0] ? files[0].filename : ''; 
        const file2 = files[1] ? files[1].filename : ''; 
        const file3 = files[2] ? files[2].filename : ''; 

        const agreement = await Agreement.create({
           user: userId,role,name,email,phone,nidPassportNumber, nidPassportPdf: file1, tradeLicensePdf: file2, signaturePdf: file3
        });

        sendResponse(res,{
            statusCode: 201,
            success: true,
            message: "Created new Agreement successfully",
            data: agreement
        });
    }
);