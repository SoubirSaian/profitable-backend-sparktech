import mongoose from "mongoose";
import ApiError from "../../../error/ApiError.js";
import UserModel from "./user.model.js";




//user profile update service
export const userProfileUpdateService = async (req) => {
    const userId = req.user.userId;

    let image;
    
    if(req.file){
         image = req.file.filename;
    }

    const {name,email, mobile, profession, location, description} = req.body;

    //need user email id to find out user in db
    const user = await UserModel.findByIdAndUpdate(userId,{
        image,name,email, mobile, profession, location, description
    }).select('name email role location');

    if(!user){
        throw new ApiError(404, "User not found and failed to update profile");
    }
    
    return user;

}