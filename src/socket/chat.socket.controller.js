import ChatModel from "../app/module/chat/chat.model.js";
import MessageModel from "../app/module/chat/message.model.js";
import postNotification from "../utils/postNotification.js";
import { emitError } from "./emitError.js";
import socketCatchAsync from "../utils/socketCatchAsync.js";
import validateSocketFields from "../utils/validateSocketFields.js";

export const sendMessage = socketCatchAsync(async (socket, io, payload) => {

  validateSocketFields(socket, payload, ["receiverId", "chatId", "message"]);
  const { userId, receiverId, chatId, message } = payload;

  const existingChat = await ChatModel.findOne({
    _id: chatId,
    participants: { $all: [userId, receiverId] },
  });

  if (!existingChat){
    return emitError(socket, 404, "Chat not found");
  }

  const newMessage = await MessageModel.create({
    sender: userId,
    receiver: receiverId,
    message,
  });

  // notify both user and driver upon new message
  postNotification("New message", message, receiverId);
  postNotification("New message", message, userId);

  await Promise.all([
    ChatModel.updateOne({ _id: chatId }, { $push: { messages: newMessage._id } }),
  ]);

  // Broadcast to user means send msg to user
  io.to(userId).emit(
    "send_message",
    emitResult({
      statusCode: 200,
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    })
  );

  // Broadcast to receiver
  io.to(receiverId).emit(
    "send_message",
    emitResult({
      statusCode: 200,
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    })
  );

  return newMessage;
});

// export const ChatSocketController = {
//   sendMessage,
// };


