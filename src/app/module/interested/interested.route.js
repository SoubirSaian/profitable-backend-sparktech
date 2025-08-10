import expresss from "express"
import { getInterestedBusinessByUser, getInterestedUsersByBusiness, makeAnUserInterested } from "./interested.controller.js";
import { authorizeUser } from "../../middleware/AuthMiddleware.js";


const interestedRouter = expresss.Router();

interestedRouter.post("/make-interested", makeAnUserInterested);
interestedRouter.get("/interested-user", getInterestedUsersByBusiness);
interestedRouter.get("/interested-business", authorizeUser, getInterestedBusinessByUser);

export default interestedRouter;