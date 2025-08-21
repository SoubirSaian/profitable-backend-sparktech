import mongoose from "mongoose";
import ApiError from "../../../error/ApiError.js";
import UserModel from "./user.model.js";
import BusinessModel from "../business/business.model.js";
import path from "path";
import fs from "fs";
import { builtinModules } from "module";

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
    
    console.log(req.file);
    if(req.file){
         image = req.file.filename;
    }

    const {name, mobile, profession, location, description} = req.body;

    const user = await UserModel.findById(userId).select("name email image");
    console.log(user);
    
    if(!user) throw new ApiError(404, "User not found to update user");

    //delete user image before update user
    if(req.file){
        // if(user.image){
            // Step 2: Remove old images from filesystem      
            const filePath = path.join("uploads/user-image", user.image);
            
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // delete the file
                console.log('deleted');
                
            }
        // }
    }
    //need user email id to find out user in db
    const updatedUser = await UserModel.findByIdAndUpdate(userId,{
        image,name, mobile, profession, location, description
    },{new: true}).select('name email');

    if(!updatedUser){
        throw new ApiError(404, "User not found and failed to update profile");
    }
    
    console.log(updatedUser);
    return updatedUser; 

}

//get seller detail
export const sellerDetailService = async (req) => {
    const buyerId = req.user.userId;
    const {userId} = req.query;
    if(!userId || !buyerId){
        throw new ApiError(400, "UserId and buyerId required to get seller details");
    }
    // console.log(userId);
    

    //check buyer's subscription plan
    const buyer = await UserModel.findById(buyerId).populate({
        path: "subscriptionPlan", select: "subscriptionPlanType"
    }).select('subscriptionPlanPrice');
    // console.log(buyer);
    

    if(!buyer) throw new ApiError(404, "User subscription plan not found");

    if(buyer.subscriptionPlan && buyer.subscriptionPlan.subscriptionPlanType === "Free Plan"){

        throw new ApiError(400, "Free Plan user cant see Seller's details");
    }
    
    else if(buyer.subscriptionPlan && buyer.subscriptionPlan.subscriptionPlanType !== "Free Plan"){
        
        const userDetails = await UserModel.findById(userId).select("name email image location mobile role");
        // console.log(userDetails);
        
        if(!userDetails){
            throw new ApiError(404, "user details not found");
        }
    
        return userDetails;
    }   

}

//dashboard
//get all users with details
export const getAllUserService = async () => {

    const users = await UserModel.find({}).sort({createdAt: -1}).populate({
        path: "subscriptionPlan", select: "subscriptionPlanType"
    }).select('name email mobile country role');

    if(!users) throw new ApiError(500, "No user found. Server Error");
    
    return users;
}

//user's listed business service
export const usersTotalListedBusinessService = async (query) => {
    const {userId} = query;
    if(!userId) throw new ApiError(400, "User id is required to get user's total listed business");

    const result = await BusinessModel.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(userId) } // Filter by user
      },
      {
        $facet: {
          totalListed: [{ $count: "count" }],
          totalSold: [
            { $match: { isSold: true } }, // assuming you have a "status" field
            { $count: "count" }
          ],
          totalApproved: [
            { $match: { isApproved: true } },
            { $count: "count" }
          ],
          businessTitles: [
            { $project: { title: 1, _id: 0 } }
        ]
        }
      },
      {
        $project: {
          totalListed: { $ifNull: [{ $arrayElemAt: ["$totalListed.count", 0] }, 0] },
          totalSold: { $ifNull: [{ $arrayElemAt: ["$totalSold.count", 0] }, 0] },
          totalApproved: { $ifNull: [{ $arrayElemAt: ["$totalApproved.count", 0] }, 0] },
          businessTitles: "$businessTitles.title"
        }
      }
    ]);

    const totalListed = result[0].totalListed;
    const totalApproved = result[0].totalApproved;
    const totalSold = result[0].totalSold
    const rejectedListing = totalListed - totalApproved;

    console.log(result);
    console.log(result[0].totalListed,);
    
    // return {totalListed,totalApproved,totalSold,rejectedListing};
    return result;
}