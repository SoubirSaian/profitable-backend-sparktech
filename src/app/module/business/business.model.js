import mongoose, { Mongoose } from "mongoose";


const businessSchema = new mongoose.Schema({
    image: {
        type: String
    },
    title: {
        type: String
    },
    category: {
        type: String
    },
    country: {
        type: String
    },
    location: {
        type: String
    },
    askingPrice: {
        type: String
    },
    ownershipType: {
        type: String
    },
    businessType: {
        type: String
    },
    industryName: {
        type: String
    },
    description: {
        type: String
    }
},{timestamps: true});



const BusinessModel = mongoose.models.Business || mongoose.model("Business",businessSchema);

export default BusinessModel;