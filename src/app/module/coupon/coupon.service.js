import ApiError from "../../../error/ApiError.js";
import validateFields from "../../../utils/validateFields.js"
import CouponModel from "./coupon.model.js";




//create new faq service
export const createNewCouponService = async (payload) => {
    const {couponCode, reason, discount, validFrom, validTo, usageLimit, status } = payload;

    //check if all necessery data is coming or not
    validateFields(payload,["couponCode","reason","discount","validFrom","validTo"]);

    //create new faq
    const newCoupon = await CouponModel.create({couponCode, reason, discount, validFrom, validTo, usageLimit, status});
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
export const updateCouponService = async (req) => {

    const { couponId } = req.query;

    const {couponCode, reason, discount, validFrom, validTo, usageLimit, status } = req.body;

    //check if all necessery data is coming or not
    validateFields(req.body,["couponCode","reason","discount","validFrom","validTo"]);

    //update a faq
    const updatedCoupon = await CouponModel.findByIdAndUpdate(couponId,{
        $set:{
           couponCode: couponCode, reason: reason, discount: discount, validFrom: validFrom, validTo: validTo, usageLimit: usageLimit, status: status
        }
    },{new: true});

    //check if faq is updated or not
    if(!updatedCoupon){
        throw new ApiError(500,"Failed to update coupon");
    }

    return updatedCoupon;
}

//delete a faq
export const deleteCouponService = async (query) => {
    const { couponId } = query;

    //if needed convert faqId to mongoose Object id type
    //using createHexString() static method
    if(!couponId){
        throw new ApiError(400, "Coupon Id is required to delete a coupon");
    }
   

    //find faq by id and then delete
    const deletedCoupon = await CouponModel.findByIdAndDelete(couponId);

    //check if it;s deleted or not
    if(!deletedCoupon){
        throw new ApiError(404,"not found coupon and deletion failed");
    }

   

}