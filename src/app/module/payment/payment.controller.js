import catchAsync from "../../../utils/catchAsync.js";
import sendResponse from "../../../utils/sendResponse.js";
import { postCheckoutService, webhookManagerService } from "./stripe.service.js";


//to display payment success page
export const successPage = catchAsync(async (req, res) => {
  // res.render("success.ejs");
  res.send("payment successful");
});

//to display payment cancelation page
export const cancelPage = catchAsync(async (req, res) => {
  res.render("cancel.ejs");
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