import catchAsync from "../../../utils/catchAsync.js";
import { makeAMeetingScheduleService } from "./schedule.service.js";



//api ending point to make a meeting schedule
export const makeAMeetingSchedule = catchAsync ( async (req,res) => {

    const newSchedule = await makeAMeetingScheduleService(req.body);

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "Scheduled a meeting successfully",
        data: newSchedule
    });
});