import { sql } from "drizzle-orm";
import { db } from "../../connection";
import { tasksTable } from "../schema";
import { testTaskData } from "../data/test-data";

export const seedTestData = async () => {
  await db.execute(
    sql`TRUNCATE TABLE ${tasksTable} RESTART IDENTITY CASCADE`
  );

  const dataWithTimestamps = testTaskData.map(task => ({
    ...task,
    created_at: task.createdAt
  }));

  await db.insert(tasksTable).values(dataWithTimestamps);
};