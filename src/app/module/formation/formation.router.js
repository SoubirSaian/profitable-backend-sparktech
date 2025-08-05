import express from "express";
import multer from "multer";
import path from "path";
import { createNewFormat, deleteFormation, getAllFormation, updateFormation } from "./formation.controller.js";


const formationRouter = express.Router();

//here have to use use multer to upload formation image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/formation-image");
  },
  filename: (req, file, cb) => {
    //extract the file extension from filename
    const fileExtension = path.extname(file.originalname);

    const fileName = file.originalname.replace(fileExtension, "").toLowerCase().split(" ").join("-") +"-" + Date.now();

    cb(null, fileName + fileExtension);
  },
});

// preapre the final multer upload object
var upload = multer({
  storage: storage,

  limits: {
    fileSize: 1000000, // 1MB . less than 1mb file allowed
  },

  fileFilter: (req, file, cb) => {
   
      if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" ) {

        cb(null, true);

      } else {
        cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
      }
    
  },
});

//upload.single("image");

formationRouter.post("/create-format", upload.single("formation-image"), createNewFormat);
formationRouter.get("/get-all-format", getAllFormation);
formationRouter.patch("/update-format", updateFormation);
formationRouter.delete("/delete-format", deleteFormation);

export default formationRouter;