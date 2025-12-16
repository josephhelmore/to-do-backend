import { db } from "../connection";
import { tasksTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const fetchTasks = async () => {
  const tasks = await db.select().from(tasksTable);
  return tasks;
}

export const fetchTaskById = async (id: number) => {
  const task = await db
    .select()
    .from(tasksTable)
    .where(eq(tasksTable.id, id))
    .limit(1)
    .then((rows) => rows[0] || null);
  return task;
} 