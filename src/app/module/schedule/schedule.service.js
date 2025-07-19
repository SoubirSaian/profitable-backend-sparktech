import ApiError from "../../../error/ApiError.js";
import validateFields from "../../../utils/validateFields.js";
import ScheduleModel from "./schedule.model.js";


//make a meeting schedule service
export const makeAMeetingScheduleService = async (payload) => {
    const {name,email,date,time,timeZone,topic,note} = payload;

    //validate all the fields are available or not
    validateFields(payload,[
        name,email,date,time,timeZone,topic,note
    ]);

    //now make a new schedule 
    const newSchedule = await ScheduleModel.create({
        name,email,date,time,timeZone,topic,note
    });

    if(!newSchedule){
        throw new ApiError(500,"Failed to make a new Schedule");
    }

    return newSchedule;
}