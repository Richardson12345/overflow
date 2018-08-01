const userModel = require("../model/userModel");
const jwt = require('jsonwebtoken');
const bcrpyt = require('bcryptjs');
const FB = require('fb');
const send = require('../middleware/nodemailer');


class Controller {
    static signUp(req,res){
        let saltRounds = 5;
        bcrpyt.hash(req.body.password, saltRounds, (err,hash)=>{
            if(err){
                res
                .status(500)
                .json({
                    msg: "failed to bcrypt",
                });
            }else{
                userModel.create({
                    username : req.body.username,
                    email : req.body.email,
                    password: hash
                },(err,data)=>{
                    if(err){
                        res
                        .status(500)
                        .json(err)
                    }else{
                        send(req.body.email);
                        res
                        .status(200)
                        .json(data)
                    }
                })
            }
        })
    }

    static signIn(req,res){
        userModel.findOne({username : req.body.username},(err,data)=>{
            if(err){
                res
                .status(500)
                .json(err)
            }else{
                if(data !== null){
                    console.log(data)
                    let hash = data.password;
                    let password = req.body.password;
                    bcrpyt.compare(password,hash,(err,same)=>{
                        if(same){
                            jwt.sign({
                                id: data._id,
                                username : data.username,
                                email: data.email
                            },"secret",(err,token)=>{
                                if(err){
                                    res
                                    .status(500)
                                    .json(err)
                                }else{
                                    res
                                    .json({
                                        token,
                                        id: data._id
                                    })
                                }
                            })
                        }else{
                            res
                            .status(401)
                            .json({
                                msg: "wrong password"
                            })
                        }
                    })
                }else{
                    res
                    .status(401)
                    .json({
                        msg: "user does not exist"
                    })
                }
            }
        })
    }

    static fbSignIn(req,res){
        let fbToken  = req.body.fbToken;
        let addition = '#@#!#!'
        FB.api('me', { fields: ['id', 'name', "email"], access_token: fbToken }, function (result) {
            console.log(result);
            let fbUser = `${result.name}${addition}`
            console.log(fbUser)
            userModel.findOne({username : fbUser},(err,user)=>{
                if(err){
                    res
                    .status(500)
                    .send(err)
                }else{
                    console.log(user)
                    if(user === undefined || user == null){
                        userModel.create({
                            username: fbUser,
                            email: result.email,
                            password: fbUser
                        },(err,success)=>{
                            if(err){
                                console.log(err)
                            }else{
                                console.log(user)
                                jwt.sign({
                                    id: user._id,
                                    username: user.username,
                                    email: user.email
                                }, 'secret',(err,token)=>{
                                    console.log(token)
                                    res.
                                    status(200)
                                    .json({
                                            token,
                                            user
                                        })
                                })
                            }
                        })
                    }else{
                        jwt.sign({
                            id: user._id,
                            username: user.username,
                            email: user.email
                        },'secret',(err,token)=>{
                            console.log(token)
                            res.
                            status(200)
                            .json({
                                token,
                                user
                            })
                        })
                    }
                }
            })
        })
    }


}

module.exports = Controller