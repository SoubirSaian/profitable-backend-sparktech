const express = require("express");
const { webhookManager } = require("./payment.controller.js");

const webhokRouter = express.Router();

webhokRouter.post( "/", express.raw({ type: "application/json" }),
  webhookManager
);

export default webhokRouter;
