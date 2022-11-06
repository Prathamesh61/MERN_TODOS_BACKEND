const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    user_id: String,
    title: String,
    note: String,
    tag: String
})

const Todo = mongoose.model("note", todoSchema);

module.exports = { Todo };