
const jwt = require("jsonwebtoken")
// import ERRORS from "../config/errors"
require('regenerator-runtime/runtime');


// AUTHENTICATION FOR MIDDLEWARE !

const authentication = async (req, res, next) => {
    console.log("test: ", req.headers)
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader, "authHeader")

        const token = authHeader && authHeader.split(' ')[1]
        console.log("token", token)
        if(!token) {
            return res.status(401).json({message: "UNAUTHORIZED-----"})
        }
        
        await wt.verify(token, process.env.SECRET_KEY, (err, user) => {
            console.log(err)
            if(err){
                return res.status(403).json({message: "FORBIDDEN ACCESS"})
            }
            req.user = user
            console.log("verified", req.user)
            next()
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: "INTERNAL SERVER ERROR"})
    }
}

module.exports = authentication;
