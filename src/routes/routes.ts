import { Router } from "express";
import { getTasksController, getTaskByIdController} from "../controllers/getControllers";
import { deleteTaskByIdController } from "../controllers/deleteControllers";
import { postTaskController } from "../controllers/postController";
import { patchTaskController } from "../controllers/patchControllers";

const routes = Router();

routes.options("*", (req, res) => {
  res.sendStatus(204);
});

routes.get("/tasks", getTasksController);
routes.get("/tasks/:id", getTaskByIdController);
routes.delete("/tasks/:id", deleteTaskByIdController);
routes.post("/tasks", postTaskController);
routes.patch("/tasks/:id", patchTaskController);

export default routes;

