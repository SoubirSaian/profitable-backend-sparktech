import express from "express";
import multer from "multer";
import path from "path";
import { createNewBusiness, getAllBusiness, getASingleBusiness, updateABusiness } from "./business.controller.js";
import { authorizeUser } from "../../middleware/AuthMiddleware.js";


const businessRouter = express.Router();

//upload business image to local upload folder
// const uploadFolder = "../../../../upload/business-image";

//define the storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/business-image");
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

businessRouter.post("/create-business", authorizeUser , upload.single("business-image"), createNewBusiness);
businessRouter.patch("/update-business/:businessId", updateABusiness);
businessRouter.get("/all-business", getAllBusiness);
businessRouter.get("/get-one-business", getASingleBusiness);
businessRouter.post("/advanced-search", getAllBusiness);
//business valuation route
businessRouter.post("/business-valuation", getAllBusiness);


export default businessRouter;