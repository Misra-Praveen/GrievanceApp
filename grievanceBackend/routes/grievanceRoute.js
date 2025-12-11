import { Router } from "express"
import { createGrievance, getAllGrievance, getGrievanceByGrievanceNo } from "../controllers/grievanceController.js";
import {protect} from '../middlewares/authMiddleware.js'

const grievanceRouter = Router();


grievanceRouter.post("/registerGrievance", createGrievance);
grievanceRouter.get("/viewStatus", getGrievanceByGrievanceNo);
grievanceRouter.get("/adminGrievances/",protect, getAllGrievance)

export default grievanceRouter