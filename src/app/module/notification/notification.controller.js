import catchAsync from "../../../utils/catchAsync.js";
import sendResponse from "../../../utils/sendResponse.js";
import { deleteNotificationService, getAllNotificationService, getNotificationService, updateNotificationReadUnreadService } from "./notification.service.js";


//api ending point to get notification
export const getNotification = catchAsync(async (req,res) => {

    const result = await getNotificationService(req.user,req.query)

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "Notification retrieved",
        data: result
    });
});

//api ending point to get all notification
export const getAllNotification = catchAsync(async (req,res) => {

    const result = await getAllNotificationService(req.user,req.query);

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "All notification retrieved",
        data: result
    });
});

//api ending point to mark a notification is read
export const updateAsReadUnread = catchAsync(async (req, res) => {

  const result = await updateNotificationReadUnreadService( req.user, req.body );
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Notification updated",
    data: result,
  });
});

//api ending point to delete notification
export const deleteNotification = catchAsync(async (req, res) => {

  const result = await deleteNotificationService(req.user,req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Notification deleted",
    data: result,
  });
});
