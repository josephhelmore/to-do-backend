import { db } from "../connection";
import { tasksTable } from "../db/schema";

export const fetchTasks = async () => {
  const tasks = await db.select().from(tasksTable);
  return tasks;
}
