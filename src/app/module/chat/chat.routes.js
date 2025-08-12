import express from "express";
import { getAllChats, getChatMessages, postChat, updateMessageAsSeen } from "./chat.controller.js";
import { authorizeUser } from "../../middleware/AuthMiddleware.js";
// const auth = require("../../middleware/auth");
// const config = require("../../../config");

const chatRouter = express.Router();

chatRouter
  .post("/post-chat",authorizeUser , postChat)

  .get("/get-chat-messages", authorizeUser, getChatMessages)

  .get("/get-all-chats",authorizeUser, getAllChats)

  .patch("/update-message-as-seen", authorizeUser, updateMessageAsSeen);

export default chatRouter;
