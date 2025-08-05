import catchAsync from "../../../utils/catchAsync.js";
import sendResponse from "../../../utils/sendResponse.js";
import { createNewCouponService, deleteCouponService, getAllCouponService, updateCouponService } from "./coupon.service.js";




//api ending point to create new faq
export const createNewCoupon = catchAsync( async (req,res) => {

    const result = await createNewCouponService(req.body);

    sendResponse(res,{
        statusCode: 201,
        success: true,
        message: "created new coupon",
        data: result
    });
});

//api ending point to get all faq by user role
export const getAllCoupon = catchAsync(async (req,res) => {

    const result = await getAllCouponService();

    sendResponse(res,{
        statusCode:200,
        success: true,
        message: "Got all coupon",
        data: result
    });

});

//api ending point to update a Faq
export const updateCoupon = catchAsync( async (req,res) => {

    const result = await updateCouponService(req);

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "Coupon updation successful",
        data: result
    });

});

//api ending pint to delete a faq
export const deleteCoupon = catchAsync( async (req,res) => {

    await deleteCouponService(req.query);

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "coupon deleted successfully",

    })
});