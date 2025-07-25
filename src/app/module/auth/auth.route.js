import express from "express";
import multer from "multer";
import path from "path";
import { forgetPassword, forgetPasswordVerifyOtp, loginUser, registerUser, resetPassword, verifyEmailSendOtp, verifyEmailVerifyOtp } from "./auth.controller.js";


const authRouter = express.Router();

//upload business image to local upload folder
const uploadFolder = "../../../../upload/user-image"

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

//here have to add token authorization middleware.
//to check if token is available or not

authRouter.post("/register", upload.single("image") , registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/verify-email", verifyEmailSendOtp);
authRouter.post("/verify-email-check-otp", verifyEmailVerifyOtp);
authRouter.post("/forget-password", forgetPassword);
authRouter.post("/forget-password-check-otp", forgetPasswordVerifyOtp);
authRouter.post("/reset-password", resetPassword);

export default authRouter;