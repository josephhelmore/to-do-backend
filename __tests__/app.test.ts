import { describe, test, expect, beforeAll } from "vitest";
import { seedTestData } from "../src/db/seed/test-seed";
import { Task } from "../src/types/index";
import request from "supertest";
import  app  from "../src/app";


beforeAll(() => {
  return seedTestData();
});

describe("GET /tasks", () => {

  test("GET tasks from the table", async () => {
    const {
      body: { tasks },
    } = await request(app)
    .get("/api/tasks")
    .expect(200);

    expect(tasks.length).toBeGreaterThan(0);
    tasks.forEach((task: Task) => {
      expect(task).toHaveProperty("id");
      expect(task).toHaveProperty("title");
      expect(task).toHaveProperty("completed");
      expect(task).toHaveProperty("createdAt");
    });
  });
});