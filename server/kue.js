var kue = require('kue')
  , queue = kue.createQueue();
var sendMail = require('./middleware/nodemailer')

queue.process('gmail', function(job, done){
    console.log('received')
    let destination = job.data.email
    sendMail(destination)
    done()
});

module.exports = queue