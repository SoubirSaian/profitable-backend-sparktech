import Stripe from "stripe";
import config from "../../../config/index.js";
import validateFields from "../../../utils/validateFields.js";
import SubscriptionPlanModel from "../subscriptionPlan/subscription.model.js";
import { errorLogger} from "../../../utils/logger.js";
import ApiError from "../../../error/ApiError.js";
import PaymentModel from "./payment.model.js";
import UserModel from "../user/user.model.js";
import { sendSubscriptionEmail } from "../../../utils/emailHelpers.js";

//add new stripe with stripe secret key
const stripe = new Stripe(config.stripe.stripe_secret_key);
//webhook secret key
const endPointSecret = config.stripe.stripe_webhook_secret_test;

//calculate end date of subscription from duration
//need to update this function
const getEndDate = (duration) => {
  switch (duration) {
    case EnumSubscriptionPlanDuration.DAILY:
      return new Date(new Date().setDate(new Date().getDate() + 1)); //  first hour of next day
    case EnumSubscriptionPlanDuration.MONTHLY:
      return new Date(new Date().setMonth(new Date().getMonth() + 1)); //  first hour of next month
    case EnumSubscriptionPlanDuration.YEARLY:
      return new Date(new Date().setFullYear(new Date().getFullYear() + 1)); // first hour of next year
    default:
      throw new ApiError(400, "Invalid duration");
  }
};

//after completing payment update payment and send email function
const updatePaymentAndRelatedAndSendMail = async (webhookEventData) => {
  try {
    const { id: checkout_session_id, payment_intent } = webhookEventData;

    // update payment
    const payment = await PaymentModel.findOneAndUpdate(
      { checkout_session_id: checkout_session_id },
      {
        $set: {
          payment_intent_id: payment_intent,
          status: "paid",
          subscriptionStatus: "active",
        },
      },
      { new: true, runValidators: true }

    )
    .populate([
      {
        path: "subscriptionType",
        select: "subscriptionPlanType price duration",
      },
    ]);

    // update user subscription
    // calculate and stamp subscriptionStartDate and subscriptionEndDate date based on the duration
    const subscriptionStartDate = new Date();
    const subscriptionEndDate = getEndDate(payment.subscriptionPlan.duration);

    const updateUserData = {
      $set: {
        isSubscribed: true,
        subscriptionPlan: payment.subscriptionPlan,
        subscriptionStartDate,
        subscriptionEndDate,
      },
    };

    const updatedUser = await UserModel.findByIdAndUpdate(
      payment.user,
      updateUserData,
      { new: true }
    );

    // send email to user
    const emailData = {
      name: updatedUser.name,
      subscriptionPlan: payment.subscriptionPlan.subscriptionPlanType,
      price: payment.amount,
      currency: "USD",
      startDate: subscriptionStartDate,
      endDate: subscriptionEndDate,
      payment_intent_id: payment_intent,
    };

    //send mail to user with payment details
    sendSubscriptionEmail(updatedUser.email, emailData);

    // send notification
    // postNotification(
    //   "Subscription Success",
    //   "Your subscription has been successfully updated.",
    //   updatedUser._id
    // );

    // postNotification(
    //   "New Subscriber",
    //   "BetWise Picks got a new subscriber. Check it out!"
    // );

  } catch (error) {

    console.log(error);
    errorLogger.error(error.message);
  }
  
};

//perform stripe checkout service
export const postCheckoutService = async (userData, payload) => {

  validateFields(payload, ["subscriptionId"]);

  // check if user is already subscribed
  // const user = await User.findById(userData.userId).lean();

  // if (user.isSubscribed)
  //   throw new ApiError(status.BAD_REQUEST, "User is already subscribed");

  const subscriptionPlan = await SubscriptionPlanModel.findById(
    payload.subscriptionId
  ).lean();

  if (!subscriptionPlan){

      throw new ApiError(400 , "SubscriptionPlan not found");
  }

  let session = {};
  const amountInCents = Math.ceil( Number(subscriptionPlan.price).toFixed(2) * 100 );
  const amount = amountInCents / 100;

  const sessionData = {
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `http://${config.base_url}:${config.port}/payment/success`,
    cancel_url: `http://${config.base_url}:${config.port}/payment/cancel`,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Subscription Fee",
          },
          unit_amount: amountInCents,
        },
        quantity: 1,
      },
    ],
  };

  try {
    session = await stripe.checkout.sessions.create(sessionData);

  } catch (error) {
    console.log(error);
    errorLogger.error(error.message);
    throw new ApiError(500, error.message);
  }

  const { id: checkout_session_id, url } = session || {};
  const subscriptionStartDate = new Date();
  const subscriptionEndDate = getEndDate(subscriptionPlan.duration);

  const paymentData = {
    user: userData.userId,
    amount,
    checkout_session_id,
    subscriptionPlan: subscriptionPlan._id,
    status: EnumPaymentStatus.UNPAID,
    subscriptionStartDate,
    subscriptionEndDate,
  };

  const payment = await PaymentModel.create(paymentData);

  return url;
};

//webhook manager servicee
export const webhookManagerService = async (req) => {
  const sig = req.headers["stripe-signature"];
  // console.log("Content-Type:", req.headers["content-type"]);

  let event;
  const date = new Date();

  console.log("webhook hit");

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endPointSecret);
  } catch (error) {
    console.log(error);
    response.status(400).send(`Webhook error: ${error.message}`);
    return;
  }

  switch (event.type) {
    case "checkout.session.completed":
      updatePaymentAndRelatedAndSendMail(event.data.object);
      break;
    default:
      console.log(
        `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} Unhandled event type (${
          event.type
        })`
      );
  }
};
