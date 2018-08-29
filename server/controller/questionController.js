var questionModel = require("../model/questionModel");
var jwt = require("jsonwebtoken");
var mongoose  = require("mongoose"); 
   

class Controller {
    static getSpecificQuestion(req,res){
        // console.log(req.params.id)
        let id = req.params.id
        questionModel.findById(id)
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

    static createQuestion(req,res){
        let token = req.headers.token
        // res.json(token)
        if(token == null || token == undefined){
            res
            .status(401)
            .json({msg: "u need to login to post question"})        
        }else{
            jwt.verify(token, "secret", (err, decoded)=>{
                if(err){
                    console.log(err);
                    res
                    .status(500)
                    .json(err)
                }else{
                    let user = decoded.id;
                    let questionObj = {
                        question : req.body.question,
                        input: req.body.input,
                        user: user
                    };
                    questionModel.create(questionObj, (err, question)=>{
                        if(err){
                            console.log(err)
                            res
                            .status(500)
                            .json({ msg: "oops something went wrong", err, questionObj})
                        }else{
                            res
                            .status(200)
                            .json(question)
                        }
                    })
                }
            })
        }
    }

    static getQuestion(req,res){
        questionModel.find({})
        .sort({ created_at: -1 })
        .populate("user")
        .exec((err, data)=>{
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

    static upvoteQuestion(req,res){
        let token = req.headers.token;
        let questionId = req.body.question;
        // console.log(token)
        jwt.verify(token, "secret", (err, decoded)=>{
            if(err){
                res
                .status(500)
                .json(err)
            }else{
                let id = decoded.id
                questionModel
                .findById(questionId)
                .populate("user")
                .exec(function (err, question) {
                    if(err || question == null){
                        res
                        .status(500)
                        .json({err, msg: "cannot find question"})
                    }else{
                        let user = question.user._id;
                        let validate = (user == id);
                        if(question.upVote.indexOf(id) == -1 && validate == false){
                            // let downVoteIndex = question.downVote.indexOf(user);
                            // if(downVoteIndex !== -1 ){
                            //     question.downVote.splice(downVoteIndex,1)
                            // }
                            question.upVote.push(id);
                            question.save(function (err, updatedquestion) {
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
                                      updatedquestion,
                                      msg: "succesfully upvoted"
                                  })
                                };
                            });
                        }else{
                            res
                            .status(401)
                            .json({
                                msg: "you cannot upvote more than once or upvote your own questions"
                            })
                        }
                    }
                })       
            }
        })
    }

    static downvoteQuestion(req,res){
        let token = req.headers.token;
        let questionId = req.body.question;
        jwt.verify(token, "secret", (err, decoded)=>{
            if(err){
                res
                .status(500)
                .json(err)
            }else{
                let id = decoded.id
                questionModel.findById(questionId, function (err, question) {
                    let user = question.user._id;
                    let validate = (user == id);
                    if(err  && validate ==  false){
                        res
                        .status(500)
                        .json({err, msg: "cannot find question"})
                    }else{
                        let user = question.user._id;
                        let validate = (user == id);
                        console.log(user)
                        console.log(id)
                        console.log(validate)
                        if(question.downVote.indexOf(id) == -1 && validate == false ){
                            question.downVote.push(id);
                            question.save(function (err, updatedquestion) {
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
                                      updatedquestion,
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

    static updateQuestion(req,res){
        let question = req.body.question;
        questionModel.findById({ _id :  mongoose.Types.ObjectId(question) })
        .then((result => {
            let owner = result.user._id
            if( owner == req.body.current) {
                let input = req.body.input;
                questionModel.updateOne({ _id :  mongoose.Types.ObjectId(question) },
                 { input },(err, result )=> {
                    if(err){
                       res
                       .status(500)
                       .json(err)
                    }else{
                        res
                        .status(200)
                        .json(result);
                    }
                })
            } else {
                res
                .status(401)
                .json(err)
            }
        }))
        .catch((err => {
            res
            .status(401)
            .json(err)
        }))
    }

    static deleteQuestion(req,res){
        let question = req.body.question;
        questionModel.findById({ _id :  mongoose.Types.ObjectId(question) })
        .then((result => {
            let owner = result.user._id
            if( owner == req.body.current) {
                let input = req.body.input;
                questionModel.findByIdAndRemove(req.params.id, 
                    ( err, changes ) => {
                    if ( err ) {
                        res
                        .status(401)
                        .json(err)        
                    } else {
                        res
                        .status(201)
                        .json(changes)
                    }
                })  
            } else {
                res
                .status(401)
                .json(err)
            }
        }))
        .catch((err => {
            res
            .status(401)
            .json(err)
        }))      
    }
}

module.exports = Controller;