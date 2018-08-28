function sendMail (destination) {

  // console.log(data, 'from nodemail')
  var send = require('gmail-send')({
  //var send = require('../index.js')({
    user: 'chuddywarrior@gmail.com',
    // user: credentials.user,                  // Your GMail account used to send emails
    pass: 'kfurkxyxrnsocatx',
    // pass: credentials.pass,                  // Application-specific password
    to:   destination,
    // to:   credentials.user,                  // Send to yourself
                                             // you also may set array of recipients:
                                             // [ 'user1@gmail.com', 'user2@gmail.com' ]
    // from:    credentials.user,            // from: by default equals to user
    // replyTo: credentials.user,            // replyTo: by default undefined
    // bcc: 'some-user@mail.com',            // almost any option of `nodemailer` will be passed to it
    subject: 'wellcome to my overflow project',
    text:    'please enjoy my overflow project hehheh',         // Plain text
    //html:    '<b>html text</b>'            // HTML
  });
  send()
}

module.exports = sendMail
