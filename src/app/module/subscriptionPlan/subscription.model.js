import mongoose from "mongoose";


const subscriptionPlanSchema = new mongoose.Schema({
    subscriptionPlanType: {
        type: String,
        required: true,
        enum: ["free","bronze","silver","gold"]
    },
    subscriptionPlanRole:{
        type: String,
        required: true,
        enum: ["Buyer","Seller","Broker","Invester","Francise Owner","Business Idea Lister","Business Asset Seller"]
    },
    features: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        requiired: true
    },
    duration: {
        type: String,
        required: true,
        enum: ["daily","monthly","yearly"]
    }
},{ timestamps: true});

const SubscriptionPlanModel = mongoose.models.SubscriptionPlan  || mongoose.model("SubscriptionPlan", subscriptionPlanSchema);

export default SubscriptionPlanModel;