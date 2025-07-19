import express from "express";
import { createNewBusiness, getAllBusiness, updateABusiness } from "./business.controller.js";


const businessRouter = express.Router();

businessRouter.post("/create", createNewBusiness);
businessRouter.post("/update", updateABusiness);
businessRouter.get("/allBusiness", getAllBusiness);
businessRouter.post("/advanced-search", getAllBusiness);

export default businessRouter;