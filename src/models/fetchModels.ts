import { db } from "../connection";
import { tasksTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const fetchTasks = async (sort: string | undefined) => {
  const tasks = await db.select().from(tasksTable);                             //get all tasks from the tasks table
 
  const priorityOrders = {                                                      //set the priority as a numerical value
    High: { High: 1, Medium: 2, Low: 3 },
    Medium: { Medium: 1, High: 2, Low: 3 },
    Low: { Low: 1, Medium: 2, High: 3 },
  };

  const sortOrder = (sort as keyof typeof priorityOrders) || "High";            //setting the type of data. This is telling TS that 'sort' is one of 'high, med or low'
  const priorityOrder = priorityOrders[sortOrder] || priorityOrders.High;       //setting the priority order defaulting as high
  return tasks.sort((a, b) => {
    const initialOrder = priorityOrder[a.priority as "High" | "Medium" | "Low"];      //converting priorities from a string value to a numerical value
    const nextOrder = priorityOrder[b.priority as "High" | "Medium" | "Low"];
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
