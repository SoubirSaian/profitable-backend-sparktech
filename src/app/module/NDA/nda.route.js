import express from "express";
import { authorizeUser } from "../../middleware/AuthMiddleware.js";
import { getNdaFilteredByUserRole } from "./nda.controller.js";

const ndaRouter = express.Router();

ndaRouter.get("/get-nda", authorizeUser, getNdaFilteredByUserRole );

export default ndaRouter;