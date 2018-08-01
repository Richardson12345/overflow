var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    input : {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    upVote: [{
        type: String,
        default: [],  
    }],
    downVote: [{
        type: String,
        default: []
    }]
},
{ timestamps: { createdAt: 'created_at' , updatedAt: 'updated_at'} })

var questionModel = mongoose.model("Question", questionSchema)

module.exports = questionModel;