import AdminNotificationModel from "./AdminNotification.model.js";
import NotificationModel from "./notification.model";
import ApiError from "../../../error/ApiError.js";
import validateFields from "../../../utils/validateFields.js";


//get notification service
export const getNotificationService = async (userdata,query) => {
        const role = userdata.role;

        //check if notification id is available or not
        if(role !== "Admin"){
            validateFields(query,["notificationId"]);
        }

        let notification;

        if(role === "Admin"){
            notification = await AdminNotificationModel.findOne({});
        }
        else{
            notification = await NotificationModel.findOne({_id:query.notificationId});
        }

        //check if user notification is found or not
        if(!notification){
            throw new ApiError(500,"Notification not found")
        }

        return notification;

}

//get all notification service
export const getAllNotificationService = async (userData,query) => {
    const { role } = userData;

    let notification;

    if(role === "Admin"){
        notification = await AdminNotificationModel.find({});
    }else{
        notification = await NotificationModel.find({});
    }

    if(!notification){
        throw new ApiError(500, "Failed to get all notification");
    }

    return notification;
}

//mark a notifification is read service
export const updateNotificationReadUnreadService = async (userData,payload) => {
    const { role } = userData;

    let result;

    /*
        const queryObj = role === EnumUserRole.USER ? { toId: userData.userId } : {};
        queryObj.isRead = !payload.isRead;
    */

    if(role === "Admin"){
        result = await AdminNotificationModel.updateMany({},{ $set: { isRead: payload.isRead }});
    }
    else{
        result = await NotificationModel.updateMany({toId: userData.userId,},{$set: {isRead: payload.isRead}});
    }

    return result;
}

//delete notification service
export const deleteNotificationService = async (userData,payload) => {
    const { role } = userData;

    validateFields(payload,["notificationId"]);

    let deletedNotification;

    if(role === "Admin"){
        deleteNotificationService = await AdminNotificationModel.deleteOne({_id: payload.notificationId});
    }
    else{
        deletedNotification = await NotificationModel.deleteOne({_id: payload.notificationId});
    }

    //check if notification deleted or not
    if(!deletedNotification.deletedCount){
        throw new ApiError(500, "notification not found");
    }

    return deletedNotification;

}