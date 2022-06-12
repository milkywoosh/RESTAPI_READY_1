// import ERRORS from "../config/errors"

const task = require("../models")
require('regenerator-runtime/runtime');

const authorization = async ( req, res, next ) => {
    try {
        const { id_task } = req.params
        const {id_user} = req.user

        const findTask =  await task.findOne({where: {id_task}})

        if(!findTask){
            return res.status(400).json(ERRORS.NOT_FOUND)
        }
        if(findTask.id_user !== id_user){
            return res.status(401).json(ERRORS.UNAUTHORIZED)
        }
    
        next()
        
    } catch (err) {
        console.log(err)
        return res.status(500).json(ERRORS.INTERNAL_SERVER_ERROR)
    }
}

module.exports = authorization;
