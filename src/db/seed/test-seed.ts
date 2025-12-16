import { testTaskData } from "../data/test-data";
import  {db}  from "../../index";
import { tasksTable } from "../schema";

const seedTestData = async () => {
  try {

    await db.delete(tasksTable);

    await db.insert(tasksTable).values(testTaskData);

    console.log("Test data seeded successfully.");
  } catch (error) {
    console.error("Error seeding test data:", error);
  }
};

seedTestData();
