import ApiError from "../../../error/ApiError.js";
import catchAsync from "../../../utils/catchAsync.js";
import sendResponse from "../../../utils/sendResponse.js";
import BusinessModel from "../business/business.model.js";
import nodemailer from "nodemailer";
import config from "../../../config/index.js";
import termsAndConditionModel from "./termsAndCondition.model.js";
import privacyPolicyModel from "./privacyPolicy.model.js";



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

//api ending point to post felp & support
export const helpAndSupportController = catchAsync(
    async (req,res) => {
        
        const {firstName,lastName,email,phone,message} = req.body;

        //sent this data to admin email
        try {
            
            const transporter = nodemailer.createTransport({
                 host: config.smtp.smtp_host,
                 service: config.smtp.smtp_service,
                 auth: {
                    user: config.smtp.smtp_mail,
                    pass: config.smtp.smtp_password, // Use App Password for Gmail with 2FA
                 },
            });
    
            const mailOptions = {
            from: `Profitable Business <${config.smtp.smtp_mail}>`,
            to: config.smtp.smtp_mail,
            subject: 'Help and Suport',
            text: `Hi This is ${firstName ? firstName : "NA"},\n\n
                I am facing an Issue:\n\n
                Name: ${firstName ? firstName : "NA"} ${lastName ? lastName : "NA"}\n
                Email: ${email ? email : "NA"}\n
                Phone : ${phone ? phone : "NA"}\n
                Message : ${message ? message : "NA"}\n\n

                You please take necessery steps to solve the issue.\n
                Thank You.
                
                `
            };
    
            // Send email
            await transporter.sendMail(mailOptions);
    
            // Optional: Delete uploaded files after sending email
            // files.forEach(file => fs.unlinkSync(file.path));
    
            // res.status(200).json({ message: 'Email sent successfully!' });
        } 
        catch (error) {
            console.error('Error sending email:', error);
            // res.status(500).json({ message: 'Something went wrong.' });
            throw new ApiError(500,"failed to send email from Help and Support");
        }


        sendResponse(res,{
            statusCode: 200,
            success: true,
            message: "Sent data to admin",
           
        })

    }
);

//api ending point to create terms and condition
export const createtermsAndCondition = catchAsync(
    async (req,res) => {

        // const { termsId } = req.query;
        const { description } = req.body;
        if(!description) throw new ApiError(400, "Terms and condition description is needed to create and update");

        const response = await termsAndConditionModel.findByIdAndUpdate('6899d140df8b42b2014be785',{description},{new: true});
        if(!response) throw new ApiError(500, "Failed to create new terms and condition");

        sendResponse(res,{
            statusCode: 201,
            success: true,
            message: "updated terms and condition successfully",
            data: response
        });
    }
);

//api ending point to create terms and condition
export const gettermsAndCondition = catchAsync(
    async (req,res) => {

        const response = await termsAndConditionModel.find({});
        if (!response) throw new ApiError(500, "Failed to get terms and condition");

        sendResponse(res,{
            statusCode: 200,
            success: true,
            message: "Retrieved terms and condition successfully",
            data: response
        });
    }
);
//api ending point to create terms and condition
export const createPrivacyPolicy = catchAsync(
    async (req,res) => {

        const {description} = req.body;
        if(!description) throw new ApiError(400, "Privacy policy is needed to create");

        const response = await privacyPolicyModel.findByIdAndUpdate("6899ce82d3d2b8cb90f96d39",{description},{new: true});
        if(!response) throw new ApiError(500, "Failed to create Privacy Policy");

        sendResponse(res,{
            statusCode: 201,
            success: true,
            message: "created and updated privacy policy",
            data: response
        });
    }
);
//api ending point to create terms and condition
export const getPrivacyPolicy = catchAsync(
    async (req,res) => {

        const response = await privacyPolicyModel.find({});
        if (!response) throw new ApiError(500, "Failed to get privacy policy");

        sendResponse(res,{
            statusCode: 200,
            success: true,
            message: "got privacy policy",
            data: response
        });
    }
);

