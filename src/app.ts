import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello, World!");
});


/*
Routes we are going to use;
GET /tasks - Get all tasks
GET /tasks/:id - Get a specific task
POST /tasks - Create a new task
PATCH /tasks/:id - Update a task
DELETE /tasks/:id - Delete a task
*/


export default app;
