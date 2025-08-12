import http from "http";
import { Server } from "socket.io";
import app from "../app.js";
import { socketHandlers } from "../socket/socketHandlers.js";
// const { EnumSocketEvent } = require("../util/enum");

const mainServer = http.createServer(app);

const io = new Server(mainServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}
});

io.on("connection", (socket) => {
  socketHandlers(socket, io);
});

export default mainServer;
