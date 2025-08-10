import express from "express";
import { homePageSearch } from "./home.controller.js";


const homeRouter = express.Router();

homeRouter.get("/home-search", homePageSearch);

export default homeRouter;