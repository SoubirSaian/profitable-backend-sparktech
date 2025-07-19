import mongoose, { Mongoose } from "mongoose";
import validator from "validator";


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate:{
            validator: (value) => validator.isEmail(value),
            message: "Please provide a valid email address"
        }
    },
    password:{
        type: String,
        required: [true,"Password is required"]
    },
    confirmPassword:{
        type: String,
        required: [true,"confirmPassword is required"]
    },
    image: {
        type: String,
    },
    profession:{
        type: String
    },
    location: {
        type: String
    },
    description: {
        type: String
    },
    mobile:{
        type: Number,
        require: [true,"mobile number is required"]
    },
    country:{
        type: String,
        required: [true,"country name is required"]
    },
    isEmailVerified:{
        type: Boolean,
        default: false
    },
    isUserActive:{
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String
    },
    verificationCodeExpire: {
        type: Date
    },
    role:{
        type: String,
        enum: ["Buyer","Seller","Investor","Broker","Asset Seller","Francise Seller","Business Idea Lister"]
    },
    isSubscribed:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

const UserModel = mongoose.models.User || mongoose.model("User",userSchema);

export default UserModel;