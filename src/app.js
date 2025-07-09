import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middleware/globalErrorHandler.js";
import NotFoundHandler from "./error/NotFoundHandler.js";
import authRouter from "./app/module/auth/auth.route.js";
import allRouter from "./app/routes/routes.js";


const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//all implemented route
app.use("/api/v1", allRouter);
// app.use("/api/v1/auth", authRouter);


app.get("/test",(req,res)=> {
    res.send("server is running . welcome .");
})


//error handler
app.use(globalErrorHandler);
app.use(NotFoundHandler.handle);

export default app;