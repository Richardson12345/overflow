var express = require("express");
var router = express.Router();
var questionController = require("../controller/questionController")
var tokenMiddleware = require("../middleware/tokenMiddleware")


router.post("/",tokenMiddleware.verifyToken, questionController.createQuestion);
router.get("/", questionController.getQuestion);
router.delete('/:id', tokenMiddleware.verifyToken,questionController.deleteQuestion)
router.get('/one/:id', questionController.getSpecificQuestion)
router.put("/upvote",tokenMiddleware.verifyToken, questionController.upvoteQuestion);
router.put("/downvote",tokenMiddleware.verifyToken, questionController.downvoteQuestion);
router.put("/update", tokenMiddleware.verifyToken,questionController.updateQuestion )

module.exports = router