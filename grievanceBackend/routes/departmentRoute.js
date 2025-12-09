import { Router } from 'express'
import { createDepartment, getAllDepartment } from '../controllers/departmentController.js';
import {protect} from "../middlewares/authMiddleware.js"
import checkPermission from '../middlewares/permissionMiddleware.js';



const departmentRouter = Router();

departmentRouter.post("/",protect, checkPermission("MANAGE_DEPARTMENT"), createDepartment)
departmentRouter.get("/", getAllDepartment)

export default departmentRouter;