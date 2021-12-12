const express = require("express");

const app = express();

app.use(express.json());

let todo = [];

app.post("/add_todo", (req, res) => {
  const id = todo.length;
  const { text } = req.body;
  let t = { id: id, text: text };
  todo.push(t);
  res.status(200).json(t);
});

app.get("/get_todo/:id", (req, res) => {
  let id = req.params.id;
  for (let t of todo) {
    if (t.id == id) {
      return res.status(200).json({
        todo: t,
      });
    }
  }
});

app.get("/get_all_todo", (req, res) => {
  res.status(200).json(todo);
});

app.post("/update_todo/:id", (req, res) => {
  let id = req.params.id;
  const { text } = req.body;

  for (let t of todo) {
    if (t.id == id) {
      todo[t.id].text = text;
      return res.status(200).json(todo[t.id]);
    }
  }
});

app.post("/delete_todo/:id", (req, res) => {
  let id = req.params.id;
  todo = todo.filter((t) => t.id != id);
  res.status(200).json({
    todo,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
