const express = require("express");
const Todo = require("./models/Todo");
const router = express.Router();

router.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.send(todos);
});

router.post("/todos", async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description
  });
  await todo.save();
  res.send(todo);
});

router.get("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });
    res.send(todo);
  } catch {
    res.status(404);
    res.send({ error: "todo doesn't exist!" });
  }
});

router.patch("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });

    if (req.body.title) {
      todo.title = req.body.title;
    }

    if (req.body.description) {
      todo.description = req.body.description;
    }

    await todo.save();
    res.send(todo);
  } catch {
    res.status(404);
    res.send({ error: "todo doesn't exist!" });
  }
});

router.delete("/todos/:id", async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "todo doesn't exist!" });
  }
});

module.exports = router;
