const express = require('express');
const { getTodos, postTodos, patchTodos, deleteTodos, checkValidation } = require('../controllers/Todo.controllers');
const TodoRouter = express.Router();
TodoRouter.use(express.json());

TodoRouter.get("/todos", getTodos);

TodoRouter.post("/create", checkValidation, postTodos);

TodoRouter.patch("/update", patchTodos);

TodoRouter.delete("/delete", deleteTodos);

module.exports = { TodoRouter };