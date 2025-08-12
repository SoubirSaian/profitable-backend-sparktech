// const { EnumSocketEvent, EnumUserRole } = require("../util/enum");
import socketCatchAsync from "../utils/socketCatchAsync.js";
import {  sendMessage } from "./chat.socket.controller.js";
import {validateUser,updateOnlineStatus} from "./socket.controller.js";

export const socketHandlers = socketCatchAsync(async (socket, io, activeDrivers) => {
  console.log("Trying to connect");

  const userId = socket.handshake.query.userId;

  const user = validateUser(socket, io, { userId });
  if (!user) return;

  socket.join(userId);

  console.log(userId, "connected");

  await updateOnlineStatus(socket, io, {
    userId,
    isOnline: true,
  });

  // socket.on("trip_driver_location_update", (payload) => {
  //   updateDriverLocation(socket, io, { ...payload });
  // });

  socket.on("send_message", async (payload) => {
    sendMessage(socket, io, { ...payload, userId });
  });

  socket.on("disconnect", () => {
    updateOnlineStatus(socket, io, {
      userId,
      isOnline: false,
    });

    console.log(userId, "disconnected");
  });
});

