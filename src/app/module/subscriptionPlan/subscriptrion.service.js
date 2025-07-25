import ApiError from "../../../error/ApiError.js";
import validateFields from "../../../utils/validateFields.js";
import SubscriptionPlanModel from "./subscription.model.js";




//post a new subscription plan service
export const postNewSubscriptionPlanService = async (userData,payload) => {
    const {subscriptionPlanType, subscriptionPlanRole,features, price, duration  } = payload;

    validateFields(payload,[subscriptionPlanType,subscriptionPlanRole,features,price,duration]);

    //create a new subscription plan
    const newSubscriptionPlan = await SubscriptionPlanModel.create({
        subscriptionPlanType, subscriptionPlanRole,features, price, duration 
    });

    //check if new plan is created or not
    if(!newSubscriptionPlan){
        throw new ApiError(500, "Failed to create new subscription");
    }

    return newSubscriptionPlan;
    
}

//get user role based subscription plan service
export const getAllSubscriptionPlanByUserRoleService = async(userDetail) => {
    const userRole = userDetail.role;

    //check if role is available or not
    if(!userRole){
        throw new ApiError(400, "User role is needed to get user's subscription option");   
     }

    //filter subscriptions from subscription collection
    const allSubscription = await SubscriptionPlanModel.find({subscriptionPlanRole: userRole});

    if(!allSubscription){
        throw new ApiError(500, "failed to get subscription option");
    }

    return allSubscription;

}

    