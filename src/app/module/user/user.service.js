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

//get seller detail
export const sellerDetailService = async (req) => {
    const buyerId = req.user.userId;
    const {userId} = req.query;
    if(!userId || !buyerId){
        throw new ApiError(400, "UserId and buyerId required to get seller details");
    }

    //check buyer's subscription plan
    const buyer = await UserModel.findById(buyerId).populate({
        path: "subsacriptionPlan", select: "subscriptionPlanType"
    }).select('subscriptionPlanPrice');

    if(!buyer) throw new ApiError(404, "User subscription plan not found");

    if(buyer.subscriptionPlan && buyer.subscriptionPlan.subscriptionPlanType === "Free Plan"){

        throw new ApiError(400, "Free Plan user cant see Seller's details");
    }
    
    else if(buyer.subscriptionPlan && buyer.subscriptionPlan.subscriptionPlanType !== "Free Plan"){
        
        const userDetails = await UserModel.findById(userId).select("name email image location mobile role");
        
        if(!userDetails){
            throw new ApiError(404, "user details not found");
        }
    
        return userDetails;
    }   

}