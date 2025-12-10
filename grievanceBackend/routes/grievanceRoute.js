import { Router } from "express"
import { createGrievance, getAllGrievance, getGrievanceByGrievanceNo } from "../controllers/grievanceController.js";

const grievanceRouter = Router();


grievanceRouter.post("/registerGrievance", createGrievance);
grievanceRouter.get("/viewStatus", getGrievanceByGrievanceNo);
grievanceRouter.get("/admin/", getAllGrievance)

export default grievanceRouter