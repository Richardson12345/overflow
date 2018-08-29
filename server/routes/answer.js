var express = require("express");
var router = express.Router();
var answerController = require("../controller/answerController");
var tokenMiddleware = require("../middleware/tokenMiddleware");

router.get('/', answerController.getAnswers);
router.get('/one/:id', answerController.getOneAns);
router.put('/update/:id',tokenMiddleware.verifyToken, answerController.updateAnswer)
router.get('/filter/:id', tokenMiddleware.verifyToken,answerController.getSpecificAnswers);
router.post('/',tokenMiddleware.verifyToken, answerController.answerQuestion);
router.put('/upvote',tokenMiddleware.verifyToken, answerController.upvoteAnswer);
router.put('/downvote',tokenMiddleware.verifyToken, answerController.downvoteAnswer);

module.exports = router;
