import express from "express";
import multer from "multer";
import path from "path";
import { createNewAgreement } from "./agreement.controller.js";
import { authorizeUser } from "../../middleware/AuthMiddleware.js";


const agreementRouter = express.Router();

//define the storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/NDA");
  },

  filename: (req, file, cb) => {
    //extract the file extension from filename
    const fileExtension = path.extname(file.originalname);

    const fileName = file.originalname.replace(fileExtension, "").toLowerCase().split(" ").join("-") +"-" + Date.now();

    cb(null, fileName + fileExtension);
  },
});

// Configure multer for file uploads
const uploadPdf = multer({
  storage: storage, // temp storage, or you can use diskStorage for custom names
  limits: {
    fileSize: 1 * 1024 * 1024, // 1MB max per file
  },

  // fileFilter: (req, file, cb) => {
   
  //     if (file.mimetype === "file/pdf") {

  //       cb(null, true);

  //     } else {
  //       cb(new Error("Only .pdf format allowed!"));
  //     }
    
  // }
});

agreementRouter.post("/create-agreement",authorizeUser , uploadPdf.array("file",3), createNewAgreement);
// agreementRouter.get("/get-all-agreement", );
// agreementRouter.get("/get-single-agreement", );

export default agreementRouter;