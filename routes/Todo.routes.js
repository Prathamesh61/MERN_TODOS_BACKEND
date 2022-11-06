const express = require('express');
const { getTodos, postTodos, patchTodos, deleteTodos, checkValidation } = require('../controllers/Todo.controllers');
const { authentication } = require('../middlewares/authentication');
const TodoRouter = express.Router();
TodoRouter.use(express.json());

TodoRouter.get("/todos", authentication, getTodos);

TodoRouter.post("/create", authentication, postTodos);

TodoRouter.patch("/update", authentication, patchTodos);

TodoRouter.delete("/delete/:_id", authentication, deleteTodos);

module.exports = { TodoRouter };