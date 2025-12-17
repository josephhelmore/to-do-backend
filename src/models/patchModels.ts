import { db } from "../connection";
import { tasksTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const patchTaskById = async (id: number, updates: Partial<{
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
}>) => {
  const updatedTask = await db
    .update(tasksTable)
    .set(updates)
    .where(eq(tasksTable.id, id))
    .returning()
    .then((rows) => rows[0] || null);

  return updatedTask;
}