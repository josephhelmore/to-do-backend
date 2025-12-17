import { fetchTaskById } from "../models/fetchModels";
import { Request, Response, NextFunction } from "express";
import { isValidId } from "./controllerErrors";
import { tasksTable } from "../db/schema";
import { db } from "../connection";
import { eq } from "drizzle-orm";

export const patchTaskController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = parseInt(req.params.id!, 10);
    const { title, priority, completed } = req.body;

    if (!isValidId(taskId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const task = await fetchTaskById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = {
      ...task,
      title: title !== undefined ? title : task.title,
      priority: priority !== undefined ? priority : task.priority,
      completed: completed !== undefined ? completed : task.completed,
    };

    await db
      .update(tasksTable)
      .set(updatedTask)
      .where(eq(tasksTable.id, taskId));

    const refreshedTask = await fetchTaskById(taskId);

    res.status(200).json({ task: refreshedTask });
  } catch (err) {
    next(err);
  }
};