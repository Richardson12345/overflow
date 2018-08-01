var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var answerSchema = new Schema ({
                      question: {
                          type : Schema.Types.ObjectId,
                          ref: "Question"
                      },
                      answer: {
                          type: String,
                          required : [ true, "answer cannot be empty"]
                      },
                      user: {
                          type: Schema.Types.ObjectId,
                          ref : "User",
                          required : true,
                      },
                      upVote: [{
                          type: String,
                          default: []
                      }],
                      downVote: [{
                          type: String,
                          default: []
                      }],
                      },
                    { timestamps: { createdAt: 'created_at' , updatedAt: 'updated_at'} })

var answerModel = mongoose.model("Answer", answerSchema);


module.exports = answerModel



