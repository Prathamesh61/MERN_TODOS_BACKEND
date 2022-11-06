const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user.models');
require('dotenv').config();



const signUpUser = async (req, res) => {
    let { name, email, password } = req.body;
    const isUser = await User.findOne({ email })
    if (isUser) {
        res.send({ "msg": "User already exists, try logging in" })
    }
    else {
        bcrypt.hash(password, 4, async (err, hash) => {
            let newUser = new User({
                name,
                email,
                password: hash
            })
            try {
                await newUser.save()
                res.send({ "msg": "Sign up successfull" })
            }
            catch (err) {
                res.send({ "msg": "Something went wrong, please try again" })
            }
        })
    }
}


const loginUser = async (req, res) => {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    let hash = user.password;
    const user_id = user._id;
    bcrypt.compare(password, hash, async (err, result) => {
        if (err) {
            res.send({ "msg": "Something went wrong, try again later" })
        }
        if (result) {
            const token = jwt.sign({ user_id }, process.env.SECRET_KEY);
            res.send({ message: "Login successfull", token })
            res.send({ "user": `Login Successfull. welcome ${user.name}` })
        }
        else {
            res.send({ "msg": "Login failed" })
        }
    })
}

module.exports = { signUpUser, loginUser };