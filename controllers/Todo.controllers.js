const jwt = require('jsonwebtoken');
const { Todo } = require('../models/Todo.models');

const checkValidation = (req, res, next) => {
    let { title, note, tag } = req.body;
    console.log(typeof req.body.title);
    console.log(typeof req.body.note);
    console.log(typeof req.body.tag);
    if ((title && typeof (title) == "string") && (note && typeof (note) == "string") && (tag && typeof (tag) == "string")) {
        next();
    } else {
        res.send({ "msg": "Invalid data" });
    }
}

const getTodos = async (req, res) => {
    const { user_id } = req.body;
    const all_todos = await Todo.find({ user_id: user_id })
    res.send({ Todos: all_todos })
}


const postTodos = async (req, res) => {
    let { title, note, tag, user_id } = req.body;
    let newNote = new Todo({ user_id, title, note, tag });
    await newNote.save();
    console.log(newNote);
    res.send({ "msg": `todo with title ${title} created Successfully`, newNote: newNote })
}


const patchTodos = async (req, res) => {
    let { _id, user_id } = req.body;
    console.log(_id, user_id);
    let { title, note, tag } = req.body;
    await Todo.findOneAndUpdate({ user_id, _id }, { title, note, tag });
    let updatedNote = await Todo.find({ user_id, _id });
    console.log(updatedNote);
    res.send({ "msg": "Data Updated Successfully", updatedNote: updatedNote })
}

const deleteTodos = async (req, res) => {
    let { user_id } = req.body;
    let { id } = req.params;
    console.log(_id, user_id);
    const data = await Todo.findOneAndDelete({ user_id, _id:id });
    await data;
    let remaining = await Todo.find({ user_id });
    console.log(remaining);
    res.send({ "msg": "Data Deleted Successfully", data: data, remaining: remaining })
}
module.exports = { getTodos, postTodos, patchTodos, deleteTodos, checkValidation };