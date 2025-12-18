import express from "express";

import getRoutes from "./routes/routes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("https://josephhelmore.github.io/to-do-backend/");
});

app.use("/api/", getRoutes);

app.use((req, res, next) => {
  const error = {
    status: 404,
    message: "Path not found",
  };
  next(error);
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  }
);

/*
Routes we are going to use;
GET /tasks - Get all tasks
GET /tasks/:id - Get a specific task
POST /tasks - Create a new task
PATCH /tasks/:id - Update a task
DELETE /tasks/:id - Delete a task
*/

export default app;
