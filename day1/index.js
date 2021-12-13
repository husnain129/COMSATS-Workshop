const express = require("express");
const { model, Schema, connect } = require("mongoose");

const app = express();
// ---------- MONGODB CONNECTION -------------
const uri =
  "mongodb+srv://mlhlm786:mlhlm786@workshop.vzgbv.mongodb.net/Todo?retryWrites=true&w=majority";

connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

// ----------DEFINE TODO SCHEMA----------

const todoSchema = new Schema({
  text: String,
});

// -------------COMPILE TODO MODEL-------------

const Todo = model("Todo", todoSchema);

// -----------------BODY PARSER MIDDLEWARE-----------------

app.use(express.json());

// -----------------ROUTES-----------------

app.post("/add_todo", async (req, res) => {
  const { text } = req.body;
  const todo = new Todo({ text: text });
  await todo.save();
  res.status(200).json({
    ok: true,
    todo,
  });
});

app.get("/get_todo/:id", async (req, res) => {
  let id = req.params.id;
  const todo = await Todo.findById(id).select("-__v");
  if (!todo)
    return res.status(404).json({
      ok: false,
      message: "Todo not found",
    });

  res.status(200).json({
    ok: true,
    todo,
  });
});

app.get("/get_all_todo", async (req, res) => {
  const todos = await Todo.find().select("-__v");
  res.status(200).json({
    ok: true,
    todos,
  });
});

app.put("/update_todo/:id", async (req, res) => {
  let id = req.params.id;
  const { text } = req.body;
  const todo = await Todo.findByIdAndUpdate(id, { text: text }).select("-__v");
  res.status(200).json({
    ok: true,
    todo,
  });
});

app.delete("/delete_todo/:id", async (req, res) => {
  let todo = await Todo.findById(req.params.id);
  if (!todo)
    return res.status(404).json({
      ok: false,
      message: "Todo not found",
    });
  await todo.remove();
  res.status(200).json({
    ok: true,
  });
});

const PORT = 80;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
