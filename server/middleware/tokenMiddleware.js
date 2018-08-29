var jwt = require("jsonwebtoken");
var userModel = require('../model/userModel')
var mongoose = require('mongoose')

class tokenController {
    static verifyToken(req,res,next){
        const token = req.headers.token;
        // console.log(token)
        if(typeof token !== undefined || token !== null) {
            jwt.verify(token, 'secret', function(err, decoded) {
                if(err){
                    console.log(err);
                    res.json("you must be logged in to perform this task")
                }else{
                    if(decoded){
                        userModel.findById(mongoose.Types.ObjectId(decoded._id))
                        .then((result => {
                           if (result !== null && result !== undefined) {
                               req.body.current = decoded._id
                               next()
                           }
                        }))
                        .catch((err => {
                            res
                            .status(404)
                            .json(err)
                        }))
                    }else{
                        res.status(500).json({
                            msg: "internal service err"
                        })
                    }
                }
              });
        }else{
            res.status(403).json({
                err: "you must be logged in to perfom this task"
            })
        }
    }
}

module.exports = tokenController;