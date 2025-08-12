import mongoose from "mongoose";


const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
      required: true,
    },
    checkout_session_id: {
      type: String,
      unique: true,
      required: true,
    },
    payment_intent_id: {
      type: String,
    },
    status: {
      type: String,
      default: "unpaid",
      enum: {
        values: ["Unpaid", "Paid"],
        message: `Invalid payment status. Allowed values: paid or unpaid`,
      },
    },
    subscriptionStartDate: {
      type: Date,
    },
    subscriptionEndDate: {
      type: Date,
    },
    subscriptionStatus: {
      type: String,
      enum: {
        values: ["Active", "Expired"],
        message: `Invalid subscription status. Allowed values: active or expired`,
      },
    },
    subscriptionPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubscriptionPlan",
    },
  }, { timestamps: true,}
);

const PaymentModel = mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default PaymentModel;
