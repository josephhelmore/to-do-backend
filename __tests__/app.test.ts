import { describe, test, expect, beforeAll } from "vitest";
import { seedTestData } from "../src/db/seed/test-seed";
import { Task } from "../src/types/index";
import request from "supertest";
import app from "../src/app";

beforeAll(() => {
  return seedTestData();
});

describe("GET /tasks", () => {
  test("200, get all tasks from the table", async () => {
    const {
      body: { tasks },
    } = await request(app).get("/api/tasks").expect(200);

    expect(tasks.length).toBeGreaterThan(0);
    tasks.forEach((task: Task) => {
      expect(task).toHaveProperty("id");
      expect(task).toHaveProperty("title");
      expect(task).toHaveProperty("completed");
      expect(task).toHaveProperty("createdAt");
      expect(task).toHaveProperty("priority");
    });
  });
});
describe("GET /tasks/:id", () => {
  test("200, get a specific task by id", async () => {
    const {
      body: { task },
    } = await request(app).get("/api/tasks/1").expect(200);

    expect(task).toHaveProperty("id", 1);
    expect(task).toHaveProperty("title");
    expect(task).toHaveProperty("completed");
    expect(task).toHaveProperty("createdAt");
    expect(task).toHaveProperty("priority");
  });
  test("404, task not found when an invalid id is provided", async () => {
    const {
      body: { message },
    } = await request(app).get("/api/tasks/9999").expect(404);
    expect(message).toBe("Task not found");
  });
  test("400, if passed an invalid format id", async () => {
    await request(app).get("/api/tasks/abc").expect(400);
  });
});
describe("/DELETE /tasks/:id", () => {
  test("200, delete a specific task by id", async () => {
    await request(app).delete("/api/tasks/1").expect(200);
  });
  test("check that the task has been deleted", async () => {
    const {
      body: { message },
    } = await request(app).get("/api/tasks/1").expect(404);
    expect(message).toBe("Task not found");
  });
});
describe("POST /tasks", () => {
  test("201, create a new task", async () => {
    const newTask = {
      title: "Test new task",
      completed: false,
      priority: "medium",
    };

    const {
      body: { task },
    } = await request(app).post("/api/tasks").send(newTask).expect(201);

    expect(task).toHaveProperty("id");
    expect(task).toHaveProperty("title", "Test new task");
    expect(task).toHaveProperty("completed", false);
    expect(task).toHaveProperty("priority", "medium");
    expect(task).toHaveProperty("createdAt");
  });
  test("400, missing title in request body", async () => {
    const newTask = {
      completed: false,
      priority: "medium",
    };

    const {
      body: { message },
    } = await request(app).post("/api/tasks").send(newTask).expect(400);

    expect(message).toBe("Title is required and must be a string");
  });
  test("201, create a new task with default priority and description", async () => {
    const newTask = {
      title: "Test task with defaults",
    };
    const {
      body: { task },
    } = await request(app).post("/api/tasks").send(newTask).expect(201);

    expect(task).toHaveProperty("id");
    expect(task).toHaveProperty("title", "Test task with defaults");
    expect(task).toHaveProperty("completed", false);
    expect(task).toHaveProperty("priority", "medium");
    expect(task).toHaveProperty("createdAt");
  });
});
