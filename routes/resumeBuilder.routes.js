import { Router } from "express";
import { resumeBuilder } from "../controllers/resumeBuilder.js";

export const resumeRouter = Router();

resumeRouter.post("/resume-build",resumeBuilder)

