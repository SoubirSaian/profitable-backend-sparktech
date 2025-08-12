import express from "express";
import { createPrivacyPolicy, createtermsAndCondition, getPrivacyPolicy, gettermsAndCondition, helpAndSupportController, homePageSearch } from "./home.controller.js";


const homeRouter = express.Router();

homeRouter.get("/home-search", homePageSearch);
homeRouter.post("/help-and-support", helpAndSupportController);

homeRouter.post("/create-privacy-policy", createPrivacyPolicy);
homeRouter.get("/get-privacy-policy", getPrivacyPolicy);

homeRouter.post("/create-terms-condition", createtermsAndCondition);
homeRouter.get("/get-terms-condition", gettermsAndCondition);


export default homeRouter;