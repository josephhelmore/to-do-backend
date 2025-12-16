import { Request, Response, NextFunction } from "express";
import { isValidId } from "./controllerErrors";
import { tasksTable } from "../db/schema";
import { db } from "../connection";

export const postTaskController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, priority } = req.body;

    if (!title || typeof title !== "string") {
      return res
        .status(400)
        .json({ message: "Title is required and must be a string" });
    }

    const newTask = {
      title,
      description: description || "",
      priority: priority || "medium",
      completed: false,
    };

    const createdTask = await db
      .insert(tasksTable)
      .values(newTask)
      .returning()
      .then((rows) => rows[0]);

    res.status(201).json({ task: createdTask });
  } catch (err) {
    next(err);
  }
};
