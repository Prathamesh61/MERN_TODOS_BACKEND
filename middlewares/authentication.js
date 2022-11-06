const jwt = require('jsonwebtoken');
require('dotenv').config();
const authentication = (req, res, next) => {
    if (req.headers) {
        const token = req.headers?.authorization?.split(" ")[1]
        console.log(token, "token")
        jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
            if (err) {
                console.log(err)
                res.send("err")
            } else {
                req.body.userId = decoded.userId
                next()
            }
        });
    }
    else {
        res.send({ "msg": "something wrong" })
    }
}
module.exports = {
    authentication
}