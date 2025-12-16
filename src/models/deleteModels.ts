import { db } from "../connection";
import { tasksTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const deleteTaskById = async (id: number) => {
  const deletedCount = await db
    .delete(tasksTable)
    .where(eq(tasksTable.id, id))
    .returning()
    .then((rows) => rows.length);

  return deletedCount > 0;
}