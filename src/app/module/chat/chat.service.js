import ApiError from "../../../error/ApiError.js";
import validateFields from "../../../utils/validateFields.js"
import UserModel from "../user/user.model.js";
import ChatModel from "./chat.model.js";
import postNotification from "../../../utils/postNotification.js";
import mongoose from "mongoose";
import MessageModel from "./message.model.js";

//post new chat service
export const postNewChatService = async ( userDetail,payload ) => {
    const { userId } = userDetail;
    const { receiverId } = payload;

    validateFields(payload,["receiverId"]);

    const user = await UserModel.findById(userId).lean();
    if(!user){
        throw new ApiError(404,"User not found");
    }

    const receiver = await UserModel.findById(receiverId).lean();
    if(!receiver){
        throw new ApiError(404, "Receiver not found");
    }

    const existChat = await ChatModel.findOne({ participants: { $all: [userId,receiverId] } } );
    if(existChat){
        return existChat;
    }

    //create new chat
    const newChat = await ChatModel.create({ participants: [userId,receiverId], messages: [] });

    //send notification
    postNotification("New message","You have started a new conversation", receiverId);

    postNotification("New message","You have started a new conversation", userId);

    return newChat;

}

//get chat messages service
export const getChatMessagesService = async (userDetail,query) => {
    const { chatId } = query;

    validateFields(query,["chatId"]);

    //get chat messages
    const chats = await ChatModel.findOne({
        _id: chatId
    }).populate([ { path: "participants" , select: "name image mobile" }]).lean();

    if(!chats){
        throw new ApiError(404,"Chat not found");
    }

    return chats;
}

//get all chat message service
export const getAllChatsService = async (userDetail,query) => {
    // const userId = mongoose.Types.ObjectId.createFromHexString(userDetail.userId);
    const {userId} = userDetail;
    //get all chatlist by a user
    const chats = await ChatModel.aggregate([
    {
      $match: {
        participants: {
          $in: [userId],
        },
      },
    },
    {
      $lookup: {
        from: "messages",
        let: {
          messageIds: "$messages",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $in: ["$_id", "$$messageIds"] },
                  { $eq: ["$receiver", userId] },
                  { $eq: ["$isRead", false] },
                ],
              },
            },
          },
        ],
        as: "unreadMessages",
      },
    },
    {
      $addFields: {
        unRead: { $size: "$unreadMessages" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "participants",
        foreignField: "_id",
        as: "participants",
      },
    },
    {
      $project: {
        unreadMessages: 0,
      },
    },
  ]);

  if(!chats){
    throw new ApiError(404,"Failed to get chat list");
  }

  return chats;

}

//update message as seen service
export const updateMessageAsSeenService = async (userData,payload) => {
    const { userId } = userData;
    const { chatId } = payload;

    validateFields(payload,["chatId"]);

    const chat = await ChatModel.findById(chatId);
    if(!chat){
        throw new ApiError(404, "Chat not found");
    }

    const result = await MessageModel.updateMany({
        _id: {$in: chat.messages}, receiver: userId, isRead: false
    },{
        $set: { isRead : true }
    });

    return result;
 }