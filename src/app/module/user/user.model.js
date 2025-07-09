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
    
    mobile:{
        type: Number,
        require: [true,"mobile number is required"]
    },
    country:{
        type: String,
        required: [true,"country name is required"]
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isUserActive:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

const UserModel = mongoose.models.User || mongoose.model("User",userSchema);

export default UserModel;