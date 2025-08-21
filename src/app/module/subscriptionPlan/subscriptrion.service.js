import ApiError from "../../../error/ApiError.js";
import validateFields from "../../../utils/validateFields.js";
import SubscriptionPlanModel from "./subscription.model.js";




//post a new subscription plan service
export const postNewSubscriptionPlanService = async (payload) => {
    const {subscriptionPlanType, subscriptionPlanRole,features, price, duration  } = payload;

    validateFields(payload,["subscriptionPlanType","subscriptionPlanRole","features","price"]);

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

//update subscription plan service
export const updateSubscriptionService = async (req) => {

    const {subscriptionId} = req.query;
    if(!subscriptionId) throw new ApiError(400, "Subscription id is required");

    const {subscriptionPlanType,subscriptionPlanRole,price,features,duration} = req.body;

    const subscription = await SubscriptionPlanModel.findByIdAndUpdate(subscriptionId,{
        subscriptionPlanType,subscriptionPlanRole,price,features,duration
    },{new: true});

    if(!subscription) throw new ApiError(500, "Subcription update failed");

    return subscription;
}

//get user role based subscription plan service
export const getAllSubscriptionPlanByUserRoleService = async(query) => {
    const {role} = query;

    //check if role is available or not
    if(!role){
        throw new ApiError(400, "User role is needed to get user's subscription option");   
     }

    //filter subscriptions from subscription collection
    const allSubscription = await SubscriptionPlanModel.find({subscriptionPlanRole: role});

    if(!allSubscription){
        throw new ApiError(500, "failed to get subscription option");
    }

    return allSubscription;

}


//get user role based subscription plan service
export const getSingleSubscriptionPlanService = async(query) => {
    const { subscriptionId } = query;

    //check if role is available or not
    if(!subscriptionId){
        throw new ApiError(400, "Subscription Id is needed to get user's subscription plan");   
     }

    //filter subscriptions from subscription collection
    const subscription = await SubscriptionPlanModel.findById(subscriptionId);

    if(!subscription){
        throw new ApiError(500, "failed to get subscription plan");
    }

    return subscription;

}

    