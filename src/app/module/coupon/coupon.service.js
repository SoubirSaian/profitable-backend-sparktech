import ApiError from "../../../error/ApiError.js";
import validateFields from "../../../utils/validateFields.js"
import CouponModel from "./coupon.model.js";




//create new faq service
export const createNewCouponService = async (payload) => {
    const {couponCode, reason, discount, validateFrom, validateTo, usageLimit, status } = payload;

    //check if all necessery data is coming or not
    validateFields(payload,["couponCode","reason","discount","validateFrom","validateTo"]);

    //create new faq
    const newCoupon = await CouponModel.create({couponCode, reason, discount, validateFrom, validateTo, usageLimit, status});
    if(!newCoupon){
        throw new ApiError(500,"Failed to create new Coupon");
    }

    return newCoupon;
}

//get all faq filtered bu user role
export const getAllCouponService = async () => {
    

    //filter faq by user role from faq collection
    const allCoupon = await CouponModel.find({});

    if(!allCoupon){
        throw new ApiError(404,"Failed to get all coupon");
    }

    return allCoupon;
}

//update a faq service
export const updateCouponService = async (payload) => {

    const {couponCode, reason, discount, validateFrom, validateTo, usageLimit, status,couponId } = payload;

    //check if all necessery data is coming or not
    validateFields(payload,["couponCode","reason","discount","validateFrom","validateTo","couponId"]);

    //update a faq
    const updatedCoupon = await CouponModel.findByIdAndUpdate({_id: couponId},{
        $set:{
           couponCode: couponCode, reason: reason, discount: discount, validateFrom: validateFrom, validateTo: validateTo, usageLimit: usageLimit, status: status
        }
    },{new: true});

    //check if faq is updated or not
    if(!updatedCoupon){
        throw new ApiError(404,"Failed to update coupon");
    }

    return updatedCoupon;
}

//delete a faq
export const deleteCouponService = async (query) => {
    const { couponId } = query;

    //if needed convert faqId to mongoose Object id type
    //using createHexString() static method

    validateFields(query,["couponId"]);

    //find faq by id and then delete
    const deletedCoupon = await CouponModel.findByIdAndDelete(faqId);

    //check if it;s deleted or not
    if(!deletedCoupon){
        throw new ApiError(404,"not found coupon and deletion failed");
    }

    return deletedCoupon;

}