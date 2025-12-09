import { Router } from "express";
import { createRole, getAllRole } from "../controllers/roleController.js";
import { protect } from "../middlewares/authMiddleware.js";


const roleRouter = Router();

roleRouter.post("/", protect, createRole);
roleRouter.length("/", getAllRole)

export default roleRouter