import app from "./app.js";
import config from "./config/index.js";
import { errorLogger, logger } from "./utils/logger.js";
import mongoDBConnection from "./DB/dbConnection.js";

let port = config.port ;

async function main(){
    try {
        //db connection
        mongoDBConnection();

        //server hitting in particular port
        app.listen(port,()=>{
            console.log(`server hitting port : ${port}`);
            
        });

        //to handle unhandled error
        process.on("unhandledRejection",(error)=>{
            errorLogger.error("Unhandled Rejection", error);
        })

        process.on("uncaughtException",(error)=>{
            errorLogger.error("Uncaught Exception", error);
        })

        process.on("SIGTERM", () => {
            logger.info("SIGTERM received");
        });

    } catch (error) {
        errorLogger.error("Main function error", error);
        
    }
}

main();

//mongodb local connection url
// mongodb://localhost:27017