var answerModel = require("../model/answerModel");
var jwt = require("jsonwebtoken");
var mongoose = require ("mongoose");

class Controller {
    static answerQuestion(req,res){
        let token = req.headers.token;
        jwt.verify(token, "secret", (err, decoded)=>{
            if(err){
                res
                .status(500)
                .json(err)
            }else{
                let user = decoded.id;
                answerModel.create({
                    question: req.body.question,
                    answer: req.body.answer,
                    user: user
                },(err, answer)=>{
                    if(err){
                        res
                        .status(500)
                        .json({
                            err,
                            msg: "fields cannot be empt"
                        })
                    }else{
                        res
                        .status(200)
                        .json({
                            answer
                        })
                    }
                })
                
            }
        })
    }

    static getAnswers(req,res){
        answerModel.find({})
        .sort({ created_at: -1 })
        .populate("question")
        .populate("user")
        .exec((err,data)=>{
            if(err){
                res
                .status(500)
                .json(err)
            }else{
                res
                .status(200)
                .json(data)
            }
        })
    }

    static getSpecificAnswers(req,res){
        let id = req.params.id
        answerModel.find({
            question : mongoose.Types.ObjectId(id)
        })
        .sort({ created_at: -1 })
        .populate("user")
        .exec((err,data) => {
            if(err){
                res
                .status(500)
                .json({
                    err,
                    msg: "answer might not exist"
                })
            }else{
                res
                .status(200)
                .json(data)
            }
        })

    }
    
    static upvoteAnswer(req,res){
        let token = req.headers.token;
        let answerId = req.body.answer;
        jwt.verify(token, "secret", (err, decoded)=>{
            if(err){
                res
                .status(500)
                .json(err)
            }else{
                let id = decoded.id
                answerModel.findById(answerId)
                .populate("user")
                .exec(function (err, answer) {
                    if(err || answer == null ){
                        res
                        .status(500)
                        .json({err, msg: "cannot find answer"})
                    }else{
                        let user = answer.user._id;
                        console.log(user)
                        let validate = (user == id)
                        if(answer.upVote.indexOf(id) == -1 && validate == false){
                            answer.upVote.push(id);
                            answer.save(function (err, updatedanswer) {
                              if(err){
                                  res
                                  .status(500)
                                  .json({
                                      err
                                   })
                                }else{
                                  res
                                  .status(200)
                                  .json({
                                      updatedanswer,
                                      msg: "succesfully upvoted"
                                  })
                                };
                            });
                        }else{
                            res
                            .status(401)
                            .json({
                                msg: "you cannot upvote twice or upvote your own answers"
                            })
                        }
                    }
                })     
            }
        })
    }


    static downvoteAnswer(req,res){
        let token = req.headers.token;
        let answerId = req.body.answer;
        jwt.verify(token, "secret", (err, decoded)=>{
            if(err){
                res
                .status(500)
                .json(err)
            }else{
                let id = decoded.id
                answerModel.findById(answerId, function (err, answer) {
                    if(err || answer == null ){
                        res
                        .status(500)
                        .json({err, msg: "cannot find answer"})
                    }else{
                        let user = answer.user._id;
                        console.log(user)
                        let validate = (user == id)
                        if(answer.downVote.indexOf(id) == -1 && validate == false){
                            answer.downVote.push(id);
                            answer.save(function (err, updatedanswer) {
                              if(err){
                                  res
                                  .status(500)
                                  .json({
                                      err
                                   })
                                }else{
                                  res
                                  .status(200)
                                  .json({
                                      updatedanswer,
                                      msg: "succesfully downVoted"
                                  })
                                };
                            });
                        }else{
                            res
                            .status(401)
                            .json({
                                msg: "you cannot downVote twice"
                            })
                        }
                    }
                })
            }
        })
    }

}

module.exports = Controller