import express from "express";
import { makeAMeetingSchedule } from "./schedule.controller.js";

const scheduleRouter = express.Router();

scheduleRouter.post("/make-schedule", makeAMeetingSchedule);

export default scheduleRouter;