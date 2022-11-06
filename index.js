const express = require('express');
const { connection } = require('./config/db');
const { authentication } = require('./middlewares/authentication');
const { UserRouter } = require('./routes/Auth.routes');
const { TodoRouter } = require('./routes/Todo.routes');
const app = express();
app.use(express.json());
require('dotenv').config();
const cors = require('cors');
app.use(cors());

app.get("/", (req, res) => {
    res.send("hello this is homepage");
})

app.use("/", UserRouter);

app.use("/", authentication, TodoRouter);

app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("Connection to DB successfully")
    }
    catch (err) {
        console.log("Error connecting to DB")
        console.log(err)
        res.send(err)
    }
    console.log("Listening on PORT", process.env.PORT)
})