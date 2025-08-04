import ApiError from "../../../error/ApiError.js";
import validateFields from "../../../utils/validateFields.js";
import InterestedModel from "./interested.model.js";



//make an user interested to a particular service
export const makeAnUserInterestedService = async (payload) => {
    const {businessId,userId,name,mobile,sector,activity,email,serviceZone,message} = payload;

    //check if all the fields are available
    validateFields(payload,["businessId","userId","name","email"]);

    const newInterestedUser = await InterestedModel.create({
        businessId,userId,name,mobile,sector,activity,email,serviceZone,message
    });

    if(!newInterestedUser){
        throw new ApiError(500,"Failed to create new user interested to a Business");
    }

    return newInterestedUser
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
export const getAllInterestedBusinessByUserService = async (query) => {
    const { userId } = query;

    if(!userId){
        throw new ApiError(400, "userId  is required to filter interested business");
    }

    const interestedBusiness = await InterestedModel.find({userId:  userId});
    
    if(!interestedBusiness){
        throw new ApiError(500, "failed to get all interested user");
    }

    return interestedBusiness;
}