import ApiError from "../error/ApiError.js";
import status from "http-status";


export default function validateFields(payload, requiredFields){

    //if there is no data in payload
    if(!payload){
        throw new ApiError(status.BAD_REQUEST,"Request body is required");
    }

    //loop through all required field
    for(const field of requiredFields){
        if(!payload[field]){
            throw new ApiError(status.BAD_REQUEST, `${field} is required`);
        }
    }
}