import catchAsync from "../../../utils/catchAsync.js";
import sendResponse from "../../../utils/sendResponse.js";
import UserModel from "../user/user.model.js";
import BusinessModel from "../business/business.model.js";
import CategoryModel from "../category/category.model.js";
import ApiError from "../../../error/ApiError.js";
import mongoose from "mongoose";


//api ending point to get data for dashboard
export const dashboardController = catchAsync( async (req,res) => {
   
    const [totalUser,totalBusiness,totalCategory] = await Promise.all([
        UserModel.countDocuments(),BusinessModel.countDocuments(),CategoryModel.countDocuments()
    ]); 

    const year = req.query.year; // pass dynamic year from query or params

    const result = await BusinessModel.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(`${year}-01-01`),   // first day of year
                    $lt: new Date(`${year + 1}-01-01`) // first day of next year
                }
            }
        },
        {
            $group: {
                _id: { $month: "$createdAt" },   // group by month number
                totalBusinesses: { $sum: 1 },
                //businesses: { $push: "$$ROOT" }  // optional: keep full docs for each month
            }
        },
        {
            $project: {
                month: "$_id",
                totalBusinesses: 1,
                // businesses: 1,
                _id: 0
            }
        },
        { $sort: { month: 1 } }  // sort by month ascending (Jan → Dec)
    ]);




    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "dashboard data got retrieved",
        data: {totalUser,totalBusiness,totalCategory,result}
    });
});

//api ending point to get all user
export const getAllUsers = catchAsync( async (req,res) => {
   
    const users = await UserModel.find({}).sort({createdAt: -1}).populate({
        path: "subscriptionPlan", select: "subscriptionPlanType"
    }).select('name email mobile country role');

    if(!users) throw new ApiError(500, "No user found. Server Error");
    

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "Got all user",
        data: users
    });
});

//api ending point to block user
export const blockUserController = catchAsync( async (req,res) => {
   
    const {userId} = req.query;
    if(!userId) throw new ApiError(400, "User Id is required to block a User");

    const user = await UserModel.findById(userId).select('name email isBlocked');

    //toggole isBlock
    user.isBlocked = !user.isBlocked;
    await user.save();

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "User blocked",
        data: user
    });
});

//api ending point to get user's total listed business
export const getUsersTotalBusiness = catchAsync( async (req,res) => {
   
    const {userId} = req.query;
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
          ],
          businessCategories: [
            { $project: { category: 1, _id: 0 } }
          ],
          businessCountries: [
            { $project: { country: 1, _id: 0 } }
          ]
        }
      },
      {
        $project: {
          totalListed: { $ifNull: [{ $arrayElemAt: ["$totalListed.count", 0] }, 0] },
          totalSold: { $ifNull: [{ $arrayElemAt: ["$totalSold.count", 0] }, 0] },
          totalApproved: { $ifNull: [{ $arrayElemAt: ["$totalApproved.count", 0] }, 0] },
          businessTitles: "$businessTitles.title",
          businessCategories: "$businessCategories.category",
          businessCountries: "$businessCountries.country"
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
    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "Got userr's total listed business with statistics",
        data: {totalListed,totalApproved,totalSold,rejectedListing,result}
    });
});

//api ending point to get user's total listed business
export const allListedBusiness = catchAsync( async (req,res) => {
    const { businessRole } = req.query;

    let filter = {};

    switch (businessRole) {
        case "not-approved":
            filter = { isApproved: false };
            break;
        case "Seller":
            filter = { businessRole: "Seller", isApproved: true };
            break;
        case "Asset Seller":
            filter = { businessRole: "Asset Seller", isApproved: true };
            break;
        case "Francise Seller":
            filter = { businessRole: "Francise Seller", isApproved: true };
            break;
        case "Business Idea Lister":
            filter = { businessRole: "Business Idea Lister", isApproved: true };
            break;
        default:
            filter = {}; // optional fallback
    }

    const business = await BusinessModel.find(filter).populate({path: "user", select:"name email image"});
   
    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "Got all listed business",
        data: business
    });
});

//api ending point to get user's total listed business
export const approveBusinessController = catchAsync( async (req,res) => {
   
    const {businessId} = req.query;
    if(!businessId) throw new ApiError(400,"Business id is required to make a business approved");

    await BusinessModel.findByIdAndUpdate(businessId,{ $set:{ isApproved: true } });
    
    // return {totalListed,totalApproved,totalSold,rejectedListing};
    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "Approval done for this business",
    });
});

