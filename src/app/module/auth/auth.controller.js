import catchAsync from "../../../utils/catchAsync.js";
import sendResponse from "../../../utils/sendResponse.js";
// import UserModel from "../user/user.model.js";
import {  forgetPasswordOtpVerifyService, forgetPasswordService, resetPasswordService, selectUsersRoleService, userLoginService, userRegistrationProcess, verifyEmailSendOtpService, verifyEmailVerifyOtpService } from "./auth.service.js";



//api end point for reistering user
export const registerUser = catchAsync(async (req,res) => {

    const result = await userRegistrationProcess(req.body);
    console.log(result);
    

    const isSuccess = (result.message === "Account created successfully. Please check your email" );

    sendResponse(res, {
        statusCode: isSuccess ? 200 : 400,
        success: isSuccess,
        message: result.message || "Something went wrong",
        data: result
    });

    // const {name,email,password,confirmPassword,mobile,country} = req.body;
    // try {
    //     //first check all fields are available
    //     if(!name || !email || !password || !confirmPassword || !mobile || !country ){
    //         return res.status(400).json({
    //             success: false,
    //             message: "all the fields must be filled"
    //         });
    //     }

    //     //then check both password matched or not
    //     if(password !== confirmPassword){
    //         return res.json({
    //             success: false,
    //             message: "both password hav to become equal"
    //         });
    //     }

    //     //then check if user already exists or not
    //     const isExist = await UserModel.findOne({email});
    //     if(isExist){
    //         return res.json({
    //             success: false,
    //             message: "user already exists. please login"
    //         });
    //     }

    //     //hash password

    //     //if there is no issue with meta data then
    //     //a new user will be created
    //     const newUser = new UserModel({
    //         name,email,password,country,mobile
    //     });

    //     await newUser.save();

    //     // 
    //     sendResponse(res,{
    //         success: true,
    //     });
        
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         success: false,
    //         message: "register user api failed",
    //         error
    //     });
    // }
});


//api end point to login user
export const loginUser = catchAsync(async (req, res) => {
     const result = await userLoginService(req.body);

     //cookie related job
    // const { refreshToken } = result;

    // const cookieOptions = {
    //     secure: config.env === "production",
    //     httpOnly: true,
    // };

    // res.cookie("refreshToken", refreshToken, cookieOptions);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Log in successful",
        data: result,
    });
});

//api ending point to verify email
export const verifyEmailSendOtp = catchAsync(async (req, res) => {
    await verifyEmailSendOtpService(req.body);

    //send response
    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "Check your email"
    });
});

//api ending point to verify email otp
export const verifyEmailVerifyOtp = catchAsync( async (req,res) => {
    const result =  await verifyEmailVerifyOtpService(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Code verified successfully",
        data: result
    });
});

//api ending point for forgetPassword
export const forgetPassword = catchAsync(async (req,res) => {
    await forgetPasswordService(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Check your email"
    });
});

//api ending point for forget password verify otp
export const forgetPasswordVerifyOtp = catchAsync( async (req,res) => {
    const result = await forgetPasswordOtpVerifyService(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Code verified successfully",
        data: result
    });
});

//api ending point for reset password
export const resetPassword = catchAsync( async (req,res) => {
    await resetPasswordService(req.body);

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "Password has been reset successfully.",
    });
});

//api ending point to select role
export const selectUsersRole = catchAsync(async (req,res) => {

    await selectUsersRoleService(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: " User role added successfully"
    });
});

