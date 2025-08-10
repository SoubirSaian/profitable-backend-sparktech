import mongoose from "mongoose";
import ApiError from "../../../error/ApiError.js";
import UserModel from "./user.model.js";


//user details service
export const getUserDetailsService = async (user) => {
    const {userId} = user;
    if(!userId){
        throw new ApiError(400, "UserId is required to get user details");
    }

    const userDetails = await UserModel.findById(userId).populate(
        {
           path: "subscriptionPlan",
           select:"subscriptionPlanType price duration"
        }
    );
    
    if(!userDetails){
        throw new ApiError(404, "user details not found");
    }

    return userDetails;
}


//user profile update service
export const userProfileUpdateService = async (req) => {
    const userId = req.user.userId;

    let image;
    
    if(req.file){
         image = req.file.filename;
    }

    const {name, mobile, profession, location, description} = req.body;

    //need user email id to find out user in db
    const user = await UserModel.findByIdAndUpdate(userId,{
        image,name, mobile, profession, location, description
    }).select('name email');

    if(!user){
        throw new ApiError(404, "User not found and failed to update profile");
    }
    
    return user;

}