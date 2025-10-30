import { Router } from "express";
import { resources, suggestions } from "../controllers/carearGuide.controllers.js";

export const careerRouter = Router();

careerRouter.post("/suggestions",suggestions)
careerRouter.get("/resources",resources)