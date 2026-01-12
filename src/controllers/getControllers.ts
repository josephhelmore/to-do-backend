import { fetchTasks, fetchTaskById } from "../models/fetchModels";
import { Request, Response, NextFunction } from "express";
import { isValidId } from "./controllerErrors";

export const getTasksController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sort = req.query.sort as string | undefined;
    const tasks = await fetchTasks(sort);

    
    res.status(200).json({ tasks });
  } catch (err) {
    next(err);
  }
};

export const getTaskByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = parseInt(req.params.id!, 10);

    if (!isValidId(taskId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const task = await fetchTaskById(taskId);

    if (task) {
      res.status(200).json({ task });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    next(err);
  }
};
