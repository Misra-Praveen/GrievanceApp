import { Router } from "express"
import { changeStatus, createGrievance, getAllGrievance, getGrievanceByGrievanceNo } from "../controllers/grievanceController.js";
import {protect} from '../middlewares/authMiddleware.js'
import checkPermission from '../middlewares/permissionMiddleware.js'

const grievanceRouter = Router();


grievanceRouter.post("/registerGrievance", createGrievance);
grievanceRouter.get("/viewStatus", getGrievanceByGrievanceNo);
grievanceRouter.get("/adminGrievances/",protect, getAllGrievance)
grievanceRouter.put("/grievance/:grievanceNo/status",protect, checkPermission("MANAGE_STATUS"), changeStatus)

export default grievanceRouter