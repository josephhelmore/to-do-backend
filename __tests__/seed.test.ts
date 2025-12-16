import { describe, test, expect, beforeAll } from "vitest";
import { testTaskData } from "../src/db/data/test-data";
import { seedTestData } from "../src/db/seed/test-seed";
import { db } from "../src/connection";
import { tasksTable } from "../src/db/schema";

beforeAll(async () => {
  await seedTestData();
});

describe("Test Data Seeding", () => {
  test("should seed test data into the tasks table", async () => {
    const tasks = await db.select().from(tasksTable);

    expect(tasks.length).toBe(testTaskData.length);
    
    tasks.forEach((task, index) => {
      expect(task.title).toBe(testTaskData[index].title);
      expect(task.completed).toBe(testTaskData[index].completed);
      expect(task.priority).toBe(testTaskData[index].priority);
      expect(new Date(task.createdAt).toISOString()).toBe(
        testTaskData[index].createdAt.toISOString()
      );
    });
  });
});

test("each task should have the correct properties", async () => {
  const tasks = await db.select().from(tasksTable);

  tasks.forEach((task) => {
    expect(task).toHaveProperty("id");
    expect(task).toHaveProperty("title");
    expect(task).toHaveProperty("completed");
    expect(task).toHaveProperty("priority");
    expect(task).toHaveProperty("createdAt");
    expect(typeof task.id).toBe("number");
    expect(typeof task.title).toBe("string");
    expect(typeof task.completed).toBe("boolean");
    expect(typeof task.priority).toBe("string");
    expect(task.createdAt).toBeInstanceOf(Date);
  });
});

test("Test tasks should have the correct title", async () => {
  const tasks = await db.select().from(tasksTable);

  const title = tasks[0];
  expect(title.title).toBe("Buy groceries");
  expect(title.completed).toBe(false);
  expect(title.priority).toBe("high");
  expect(new Date(title.createdAt).toISOString()).toBe(
    new Date("2024-01-01T10:00:00Z").toISOString()
  );
});
