import { Request, Response, NextFunction } from "express";
import { deleteTaskById } from "../models/deleteModels";
import { isValidId } from "./controllerErrors";

export const deleteTaskByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = parseInt(req.params.id!, 10);

    if (!isValidId(taskId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const deleted = await deleteTaskById(taskId);

    if (deleted) {
      res.status(200).json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    next(err);
  }
};