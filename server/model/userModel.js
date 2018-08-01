var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const emailValidator = function(email) {
    return /^\w([.!#$%&’*+/=?^_`{|}~-]*?\w+)+@\w+(\.\w{2,3})+$/.test(email);
  };

let userSchema = new Schema({
    username : {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique : true,
        required: true,
        validate: [ emailValidator, "must be an email format"]
    },
    password : {
        type: String,
        required: true
    }
})

let userModel = mongoose.model("User", userSchema);

module.exports = userModel;