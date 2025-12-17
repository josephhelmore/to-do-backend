import { sql } from "drizzle-orm";
import { db } from "../../connection";
import { tasksTable } from "../schema";
import { testTaskData } from "../data/test-data";

export const seedTestData = async () => {
  await db.execute(
    sql`TRUNCATE TABLE ${tasksTable} RESTART IDENTITY CASCADE`
  );

  await db.insert(tasksTable).values(testTaskData);
};