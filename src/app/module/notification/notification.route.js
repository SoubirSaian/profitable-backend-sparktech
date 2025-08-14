import express from "express";
import { getNotification,getAllNotification, deleteNotification } from "./notification.controller.js";
import { authorizeUser } from "../../middleware/AuthMiddleware.js";


const notificationRouter = express.Router();

notificationRouter.get("/get-single-notification", authorizeUser, getNotification);
notificationRouter.get("/get-all-notification",authorizeUser, getAllNotification);
notificationRouter.delete("/delete-notification", deleteNotification);

export default notificationRouter;