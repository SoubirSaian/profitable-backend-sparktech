import catchAsync from "../../../utils/catchAsync.js";
import sendResponse from "../../../utils/sendResponse.js";
import ApiError from "../../../error/ApiError.js";
import SubscriberModel from "./subscriber.model.js";


//api ending point to create a new subscriber
export const createNewSubscriber = catchAsync( 
    async (req,res) => {

        const { email } = req.body;
        if(!email){
            throw new ApiError(400, "Email id is required to subscribe");
        }

        //create new subscriber
        const newSubscriber = await SubscriberModel.create({email});
        if(!newSubscriber){
            throw new ApiError(500,"Failed to create new subscriber");
        }

        sendResponse(res, {
            statusCode: 201,
            susscess: true,
            message: "Subscriber added",
            data: newSubscriber
        });
    }
);

//api ending point to retrieve all subscriber
export const retrieveSubscriberList = catchAsync(
    async (req,res) => {

        const subscriberList = await SubscriberModel.find({});
        if(!subscriberList){
            throw new ApiError(404,"Failed to get subscriber list");
        }

        sendResponse(res,{
            statusCode: 200,
            success: true,
            message: "Retrieved subscriber list suceessfully",
            data: subscriberList
        });
    }
);