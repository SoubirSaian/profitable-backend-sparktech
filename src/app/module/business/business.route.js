import express from "express";
import multer from "multer";
import path from "path";
import { createNewBusiness, getAllBusiness, updateABusiness } from "./business.controller.js";


const businessRouter = express.Router();

//upload business image to local upload folder
const uploadFolder = "../../../../upload/business-image"

//define the storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
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

businessRouter.post("/create", upload.single("image"), createNewBusiness);
businessRouter.post("/update", updateABusiness);
businessRouter.get("/allBusiness", getAllBusiness);
businessRouter.post("/advanced-search", getAllBusiness);
//business valuation route
businessRouter.post("/business-valuation", getAllBusiness);


export default businessRouter;