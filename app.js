import express from "express";
import bodyParser from "body-parser";
import db from "./db/db";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/v1/todos", (req, res) => {
  res.status(200).send({
    success: "true",
    message: "Todos successfully retrieved!",
    todos: db
  });
});

app.get("/api/v1/todos/:id", (req, rest) => {
  const id = parseInt(req.params.id, 10);
  const todo = db.find(todo => todo.id === id);
  if (todo) {
    return res.status(200).send({
      success: "true",
      message: "Todo successfuly retrieved!",
      todo
    });
  } else {
    return res.status(404).send({
      success: "false",
      message: "Todo does not exist"
    });
  }
});

app.post("/api/v1/todos", (req, res) => {
  if (!req.body.title || req.body.description) {
    return res.status(400).send({
      success: "false",
      message: "Title and description are required"
    });
  } else {
    const todo = {
      id: db[db.length - 1].id + 1,
      title: req.body.title,
      description: req.body.description
    };
    db.push(todo);
    return res.status(200).send({
      success: "true",
      message: "Todo added successfully!",
      todo
    });
  }
});

const port = 5000 || process.env.PORT;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
