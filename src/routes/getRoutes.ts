import { Express } from "express";
import { Router } from "express";
import { getTasksController } from "../controllers/getControllers";

const getRoutes = Router();

getRoutes.get("/tasks", getTasksController);

export default getRoutes;