import expresss from "express"
import { getInterestedBusinessByUser, getInterestedUsersByBusiness, makeAnUserInterested } from "./interested.controller.js";


const interestedRouter = expresss.Router();

interestedRouter.post("/make-interested", makeAnUserInterested);
interestedRouter.get("/interested-user", getInterestedUsersByBusiness);
interestedRouter.get("/interested-business", getInterestedBusinessByUser);

export default interestedRouter;