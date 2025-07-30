import express from "express";
import { createNewFormat, deleteFormation, getAllFormation, updateFormation } from "./formation.controller.js";


const formationRouter = express.Router();

//here have to use use multer to upload formation image

formationRouter.post("/create-format", createNewFormat);
formationRouter.get("/all-format", getAllFormation);
formationRouter.post("/update-format", updateFormation);
formationRouter.get("/delete-format", deleteFormation);

export default formationRouter;