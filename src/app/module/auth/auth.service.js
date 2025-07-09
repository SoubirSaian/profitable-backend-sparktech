import validateFields from "../../../utils/validateFields.js";
import status from "http-status";
import UserModel from "../user/user.model.js";
import ApiError from "../../../error/ApiError.js";
import {createToken} from "../../../utils/jwtHelpers.js";
import config from "../../../config/index.js";


//user registration service
export const userRegistrationProcess = async (payload) => {

    const {name,email,password,confirmPassword,country,mobile} = payload;
    console.log(payload);
    

    //check if all the required fields are available or not
    //if anu of the field is empty then the below function throw an error
    validateFields(payload,[name,email,password,confirmPassword,country,mobile]);

    //check if both password fields are same
    if (password !== confirmPassword){
        throw new ApiError( status.BAD_REQUEST,"Password and Confirm Password didn't match" );
    }

    //check if user already exist or not
    const user = await UserModel.findOne({email});
    //if user exist then following steps will be followed
    if(user){
        //user exist so create a message
        const message = (user.isUserActive ? "Account active. Please Login" : "Already have an account. Please activate");

        //if you want to activate inactivated user
        //generate code, save this code with user. then send email to user containung code

        return {isUserActive: user.isUserActive, message};
    }

    //before saving user, hased the password

    //user not exist . so create a new user
    const newUser = await UserModel.create({
        name,email,password,country,mobile
    });

    return {
        isUserActive: false,
        message: "Account created successfully. Please check your email",
        newUser
    };

}

//user login service
export const userLoginService = async (payload) => {
    const {email, password} = payload;

    //check if email and password data is available
    validateFields(payload,[email,password]);

    //checkif user exist
    const user = await UserModel.findOne({email});

    //check if password is matched or not
    const isPasswordMatched = await bcrypt.compare(password,user.password);
    if(!isPasswordMatched){
        throw new ApiError(status.BAD_REQUEST, "Password is incorrect");
    }
    
    //nbw generate token
    const tokenPayload = {
        name: user.name,
        email: user.email,
        country: user.country,
    };

    const accessToken = createToken(tokenPayload, config.jwt.secret, config.jwt.expires_in);

    return {user, accessToken};
}