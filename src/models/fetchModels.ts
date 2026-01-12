import { db } from "../connection";
import { tasksTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const fetchTasks = async (sort: string | undefined) => {
  const tasks = await db.select().from(tasksTable);                             //get all tasks from the tasks table
 
  const priorityOrders = {                                                      //set the priority as a numerical value
    high: { high: 1, medium: 2, low: 3 },
    medium: { medium: 1, high: 2, low: 3 },
    low: { low: 1, medium: 2, high: 3 },
  };

  const sortOrder = (sort as keyof typeof priorityOrders) || "high";            //setting the type of data. This is telling TS that 'sort' is one of 'high, med or low'
  const priorityOrder = priorityOrders[sortOrder] || priorityOrders.high;       //setting the priority order defaulting as high

  return tasks.sort((a, b) => {
    const initialOrder = priorityOrder[a.priority as "high" | "medium" | "low"];      //converting priorities from a string value to a numerical value
    const nextOrder = priorityOrder[b.priority as "high" | "medium" | "low"];
    return initialOrder - nextOrder;
  });
};

export const fetchTaskById = async (id: number) => {
  const task = await db
    .select()
    .from(tasksTable)
    .where(eq(tasksTable.id, id))
    .limit(1)
    .then((rows) => rows[0] || null);
  return task;
};
