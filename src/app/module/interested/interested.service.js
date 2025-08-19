import ApiError from "../../../error/ApiError.js";
import validateFields from "../../../utils/validateFields.js";
import BusinessModel from "../business/business.model.js";
import InterestedModel from "./interested.model.js";



//make an user interested to a particular service
export const makeAnUserInterestedService = async (req) => {
    // const userRole = req.user.role;
    const {businessId,userId,name,countryCode,mobile,sector,activity,email,serviceZone,message,businessRole} = req.body;

    //check if all the fields are available
    validateFields(req.body,["businessId","userId","name","email","businessRole"]);

    //check if this business is already buyer's interested list or not
    const interestedBusiness = await InterestedModel.findOne({businessId,userId});
    if(interestedBusiness){
        
        throw new ApiError(400,"You already added this business in your interested list");
    } 

    const newInterestedUser = await InterestedModel.create({
        businessId,userId,businessRole,name,countryCode,mobile,sector,activity,email,serviceZone,message
    });

    if(!newInterestedUser){
        throw new ApiError(500,"Failed to create new user interested to a Business");
    }

    return newInterestedUser;
}

//get all interested users filtered by business
export const getAllInterestedUsersService = async (query) => {
    const { businessId } = query;

    if(!businessId){
        throw new ApiError(400, "businessId  is required to filter interested user");
    }

    const interestedUsers = await InterestedModel.find({businessId: businessId});
    
    if(!interestedUsers){
        throw new ApiError(500, "failed to get all interested user");
    }

    return interestedUsers;
}


//get all interested Business filtered by user
export const getAllInterestedBusinessByUserService = async (req) => {
    const { userId,role } = req.user;

    if(!userId || !role){
        throw new ApiError(400, "userId and role  is required to filter interested business");
    }

    //now check user role and perform query
    if(role === "Buyer"){
        const interestedBusiness = await InterestedModel.find({userId: userId, businessRole: "Seller" }).populate({ path: "businessId"});
        const interestedBusinessAsset = await InterestedModel.find({userId: userId, businessRole: "Asset Seller" }).populate({ path: "businessId"});
        const interestedFranchise = await InterestedModel.find({userId: userId, businessRole: "Francise Seller" }).populate({ path: "businessId"});
        const interestedBusinessIdeas = await InterestedModel.find({userId: userId, businessRole: "Business Idea Lister" }).populate({ path: "businessId"});

        return {interestedBusiness,interestedBusinessAsset,interestedFranchise,interestedBusinessIdeas};
        
    }
    else if(role === "Seller"){
        const myBusiness = await BusinessModel.find({user: userId, isSold: false});
        const mySoldBusiness = await BusinessModel.find({user: userId, isSold: true});

        return {myBusiness,mySoldBusiness};
    }   

    else if(role === "Broker"){
        const myBusiness = await BusinessModel.find({user: userId, isSold: false});
        const mySoldBusiness = await BusinessModel.find({user: userId, isSold: true});

        return {myBusiness,mySoldBusiness};
    }   
    else if(role === "Francise Seller"){
        const myBusiness = await BusinessModel.find({user: userId, isSold: false});
        const mySoldBusiness = await BusinessModel.find({user: userId, isSold: true});

        return {myBusiness,mySoldBusiness};
    }   
    else if(role === "Investor"){
        const interestedBusiness = await InterestedModel.find({userId: userId, businessRole: "Seller" }).populate({ path: "businessId"});
        const interestedBusinessAsset = await InterestedModel.find({userId: userId, businessRole: "Asset Seller" }).populate({ path: "businessId"});
        const interestedFranchise = await InterestedModel.find({userId: userId, businessRole: "Francise Seller" }).populate({ path: "businessId"});
        const interestedBusinessIdeas = await InterestedModel.find({userId: userId, businessRole: "Business Idea Lister" }).populate({ path: "businessId"});

        return {interestedBusiness,interestedBusinessAsset,interestedFranchise,interestedBusinessIdeas};
        
    }
    else if(role === "Business Idea Lister"){
        const myBusiness = await BusinessModel.find({user: userId, isSold: false});
        const mySoldBusiness  = await BusinessModel.find({user: userId, isSold: true});

        return {myBusiness,mySoldBusiness};
    }  
    else if(role === "Asset Seller"){
        const myBusiness = await BusinessModel.find({user: userId, isSold: false});
        const mySoldBusiness = await BusinessModel.find({user: userId, isSold: true});

        return {myBusiness,mySoldBusiness};
    }  
    

   
}