import validateFields from "../../../utils/validateFields.js";
import status from "http-status";
import UserModel from "../user/user.model.js";
import ApiError from "../../../error/ApiError.js";
import {createToken} from "../../../utils/jwtHelpers.js";
import config from "../../../config/index.js";
import codeGenerator from "../../../utils/codeGenerator.js";
import { sendEmailVerifyEmail, sendResetPasswordEmail } from "../../../utils/emailHelpers.js";
import hashPassword from "../../../utils/hashPassword.js";



//user registration service
export const userRegistrationProcess = async (payload) => {

    const {name,email,password,confirmPassword,country,mobile} = payload;
    console.log(payload);
    

    //check if all the required fields are available or not
    //if anu of the field is empty then the below function throw an error
    validateFields(payload,[name,email,password,confirmPassword,country,mobile]);

    //check if both password fields are same
    if (password !== confirmPassword){
        throw new ApiError( status.BAD_REQUEST,"Password and Confirm Password didn't match" );
    }

    //check if user already exist or not
    const user = await UserModel.findOne({email});
    //if user exist then following steps will be followed
    if(user){
        //user exist so create a message
        const message = (user.isUserActive ? "Account active. Please Login" : "Already have an account. Please activate");

        //if you want to activate inactivated user
        //generate code, save this code with user. then send email to user containung code

        return {isUserActive: user.isUserActive, message};
    }

    //before saving user, hased the password

    //user not exist . so create a new user
    const newUser = await UserModel.create({
        name,email,password,country,mobile
    });

    return {
        isUserActive: false,
        message: "Account created successfully. Please check your email",
        newUser
    };

}

//user login service
export const userLoginService = async (payload) => {
    const {email, password} = payload;

    //check if email and password data is available
    validateFields(payload,[email,password]);

    //checkif user exist
    const user = await UserModel.findOne({email});

    //check if password is matched or not
    const isPasswordMatched = await bcrypt.compare(password,user.password);
    if(!isPasswordMatched){
        throw new ApiError(status.BAD_REQUEST, "Password is incorrect");
    }
    
    //nbw generate token
    const tokenPayload = {
        name: user.name,
        email: user.email,
        country: user.country,
    };

    const accessToken = createToken(tokenPayload, config.jwt.secret, config.jwt.expires_in);

    return {user, accessToken};
}

//verify Email send Otp service
export const verifyEmailSendOtpService = async (payload) => {
    const { email } = payload;

    //check if email is exist or not
    if(!email){
        throw new ApiError(status.BAD_REQUEST, "Missing Email Id");
    }

    //check if user exist or not
    const user = await UserModel.findOne({email});
    if(!user){
        throw new ApiError(status.BAD_REQUEST, "User does not exist");
    }

    //generate code for 3 minutes
    const {code , expiredAt  } = codeGenerator(3);

    //save otp code and code expiary time in user
    user.verificationCode = code;
    user.verificationCodeExpire = expiredAt;
    await user.save();


    const data = {
        name: user.name,
        code,
        codeExpireTime: Math.round( (expiredAt - Date.now()) / (60 * 1000)),
    };

    //send email to user
    sendEmailVerifyEmail(email,data);

}

export const verifyEmailVerifyOtpService = async (payload) => {
    const {email,code} = payload;

    //check if email exist or not
    if (!email) {
        throw new ApiError(status.BAD_REQUEST, "Missing email");
    }

    //now check user
    const user = await UserModel.findOne({email});

    if(!user){
         throw new ApiError(status.BAD_REQUEST, "user not found");
    }

    //check if verification code is avsilable with user not
    if (!user.verificationCode){
        throw new ApiError(  status.NOT_FOUND,  "No verification code. Get a new verification code");
    }

    //now check if verification code matched or not
    if (user.verificationCode !== code){
        throw new ApiError(status.BAD_REQUEST, "Invalid verification code!");
    }

    //update user after matching code;
    const verifiedUser = await UserModel.findOneAndUpdate({email},{isEmailVerified: true, verificationCode: null, verificationCodeExpire: null},{new: true});

    return verifiedUser;
}

//forget password send otp
export const forgetPasswordService = async (payload) => {
    const { email } = payload;

    //check if email is exist or not
    if(!email){
        throw new ApiError(status.BAD_REQUEST, "Missing Email Id");
    }

    //check if user exist or not
    const user = await UserModel.findOne({email});
    if(!user){
        throw new ApiError(status.BAD_REQUEST, "User does not exist");
    }

    //generate code for 3 minutes
    const {code , expiredAt  } = codeGenerator(3);

    //save otp code and code expiary time in user
    user.verificationCode = code;
    user.verificationCodeExpire = expiredAt;
    await user.save();


    const data = {
        name: user.name,
        code,
        codeExpireTime: Math.round( (expiredAt - Date.now()) / (60 * 1000)),
    };

    //send email to user
    sendResetPasswordEmail(email,data);
}

//forget password otp verify service 
export const forgetPasswordOtpVerifyService = async (payload) => {
    const {email,code} = payload;

    //check if email exist or not
    if (!email) {
        throw new ApiError(status.BAD_REQUEST, "Missing email");
    }

    //now check user
    const user = await UserModel.findOne({email});

    if(!user){
         throw new ApiError(status.BAD_REQUEST, "user not found");
    }

    //check if verification code is avsilable with user not
    if (!user.verificationCode){
        throw new ApiError(  status.NOT_FOUND,  "No verification code. Get a new verification code");
    }

    //now check if verification code matched or not
    if (user.verificationCode !== code){
        throw new ApiError(status.BAD_REQUEST, "Invalid verification code!");
    }

    //update user after matching code;
    const verifiedUser = await UserModel.findOneAndUpdate({email},{isEmailVerified: true, verificationCode: null, verificationCodeExpire: null},{new: true});

    return verifiedUser;
}

//reset password service
export const resetPasswordService = async (payload) => {
    const {email, newPassword,confirmPassword} = payload;

    //check if both password fields matched or not
    if (newPassword !== confirmPassword){
        throw new ApiError(status.BAD_REQUEST, "Passwords do not match")
    }

    //get user
    const user = await UserModel.findOne({email});

    if (!user) {
        throw new ApiError(status.NOT_FOUND, "User not found!");
    } 
  
    if (!user.isEmailVerified) {
        throw new ApiError(status.FORBIDDEN, "Please complete OTP verification");
    }

    //hash password
    const hashPass = await hashPassword(newPassword);

    //now change password in Database
    await UserModel.findOneAndUpdate({email},{password: hashPass});

}

//select user's role service
export const selectUsersRoleService = async (payload) => {
    const {email,role} = payload;

    //check user exist or not
    const user = await UserModel.findOne({email});

    if (!user) {
        throw new ApiError(status.NOT_FOUND, "User not found!");
    } 

    //set user's role
    user.role = role;
    await user.save();

    
}