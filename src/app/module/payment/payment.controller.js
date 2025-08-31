import ApiError from "../../../error/ApiError.js";
import catchAsync from "../../../utils/catchAsync.js";
import sendResponse from "../../../utils/sendResponse.js";
import PaymentModel from "./payment.model.js";
import { postCheckoutService, webhookManagerService } from "./stripe.service.js";


//to display payment success page
export const successPage = catchAsync(async (req, res) => {
  // res.render("success.ejs");
  res.send("payment successful");
});

//to display payment cancelation page
export const cancelPage = catchAsync(async (req, res) => {
  res.send("payment unsuccessful");
});

//api ending point to perform payment checkout in stripe
export const postCheckout = catchAsync(async (req, res) => {

  const result = await postCheckoutService(req.user, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payment for subscription initialized",
    data: result,
  });
});

//api ending point to manage stripe web hook
export const webhookManager = catchAsync(async (req, res) => {

  await webhookManagerService(req);

  res.send();
});


//dashboard
//api ending point to get all paid payment
export const getAllPaidPayment = catchAsync(
  async (req,res) => {

    const response = await PaymentModel.find({ status: "Paid"}).populate({
        path: "user", select: "-_id name email"
    }).select("amount status createdAt");

    // const meta = await PaymentModel.countDocuments({status: "Paid"});

    if(!response) throw new ApiError(404, "No payment found");

    sendResponse(res,{
      statusCode: 200,
      success: true,
      message: "Got all payment",
      // meta,
      data: response
    })
  }
);