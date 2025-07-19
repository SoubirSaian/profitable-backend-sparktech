import expresss from "express"
import { getInterestedUsersByBusiness, makeAnUserInterested } from "./interested.controller.js";


const interestedRouter = expresss.Router();

interestedRouter.post("/make-interested", makeAnUserInterested);
interestedRouter.get("/interested-user", getInterestedUsersByBusiness);

export default interestedRouter;