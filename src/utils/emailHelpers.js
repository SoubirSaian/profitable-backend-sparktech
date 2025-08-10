import status from "http-status";
import ApiError from "../error/ApiError.js";
import sendEmail from "./sendEmail.js";
import otpResendTemp from "../mail/otpResendTemp.js";
import resetPassEmailTemp from "../mail/resetPassEmailTemp.js";
import signUpEmailTemp from "../mail/signUpEmailTemp.js";
import addAdminEmailTemp from "../mail/addAdminEmailTemp.js";
import bookingEmailTemp from "../mail/bookingEmailTemp.js";
import subscriptionExpiredTemp from "../mail/subscriptionExpiredTemp.js";
import verifyEmailTemp from "../mail/verifyEmailTemp.js";



export const sendEmailVerifyEmail = async (email, data) => {
  try {
    await sendEmail({
      email,
      subject: "Verify your email",
      html: verifyEmailTemp(data),
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Email was not sent");
  }
};

export const sendResetPasswordEmail = async (email, data) => {
  try {
    await sendEmail({
      email,
      subject: "Password Reset Code",
      html: resetPassEmailTemp(data),
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Email was not sent");
  }
};

export const sendActivationEmail = async (email, data) => {
  try {
    await sendEmail({
      email,
      subject: "Activate Your Account",
      html: signUpEmailTemp(data),
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(status.INTERNAL_SERVER_ERROR, "Email was not sent");
  }
};

export const sendOtpResendEmail = async (email, data) => {
  try {
    await sendEmail({
      email,
      subject: "New Activation Code",
      html: otpResendTemp(data),
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(status.INTERNAL_SERVER_ERROR, "Email was not sent");
  }
};



export const sendAddAdminEmailTemp = async (email, data) => {
  try {
    await sendEmail({
      email,
      subject: "Admin Account Created",
      html: addAdminEmailTemp(data),
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(status.INTERNAL_SERVER_ERROR, "Email was not sent");
  }
};

export const sendSubscriptionEmail = async (email, data) => {
  try {
    await sendEmail({
      email,
      subject: "Profitable Business Subscription",
      html: bookingEmailTemp(data),
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(status.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const sendSubscriptionExpiredEmail = async (email, data) => {
  try {
    await sendEmail({
      email,
      subject: "BetWise Picks Subscription Expired",
      html: subscriptionExpiredTemp(data),
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(status.INTERNAL_SERVER_ERROR, error.message);
  }
};

