import mongoose from "mongoose";


const interestedSchema = new mongoose.Schema({
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business'
    },
    name :{
        type: String,
        required: true
    },
    mobile :{
        type: String,
        required: true
    },
    sector :{
        type: String,
        required: true
    },
    activity :{
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true
    },
    serviceZone :{
        type: String,
        required: true
    },
    message :{
        type: String,
        required: true
    },

},{timestamps: true});


const InterestedModel = mongoose.models.Interested || mongoose.model("Interested",interestedSchema);

export default InterestedModel;