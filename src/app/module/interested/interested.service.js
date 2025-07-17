import ApiError from "../../../error/ApiError.js";
import validateFields from "../../../utils/validateFields.js";
import InterestedModel from "./interested.model.js";



//make an user interested to a particular service
export const makeAnUserInterestedService = async (payload) => {
    const {businessId,name,mobile,sector,activity,email,serviceZone,message} = payload;

    //check if all the fields are available
    validateFields(payload,[
        businessId,name,mobile,sector,activity,email,serviceZone,message
    ]);

    const newInterestedUser = await InterestedModel.create({
        businessId,name,mobile,sector,activity,email,serviceZone,message
    });

    if(!newInterestedUser){
        throw new ApiError(500,"Failed to create new user interested to a Business");
    }

    return newInterestedUser
}

//get all interested users filtered by business
export const getAllInterestedUsersService = async (payload) => {
    const { businessId } = payload;

    if(!businessId){
        throw new ApiError(401, "Id is required to filter interested user");
    }

    const interestedUsers = await InterestedModel.find({businessId: businessId});
    
    if(!interestedUsers){
        throw new ApiError(500, "failed to get all interested user");
    }

    return interestedUsers;
}