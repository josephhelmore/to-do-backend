import { fetchTasks } from "../models/fetchModels"; 
import { Request, Response, NextFunction } from "express";

export const getTasksController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await fetchTasks();
    res.status(200).json({ tasks });
  } catch (err) {
    next(err);
  }
};