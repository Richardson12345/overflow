let send = function (email) {

    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "invoke.computer@gmail.com", // generated ethereal user
        pass: "11121314151" // generated ethereal passwor
      }
    });
  
  
    const mailOptions = {
      from: 'invoke.computer@gmail.com', // sender address
      to: email,  // list of receivers
      subject: 'wellcome to subarshi overflowing', // Subject line
      html: '<p>Hi welcome to the subarashi overflow! hontoni subarashi dude. SUGGGOIII!!!! </p>' // plain text body
    };
  
  
    transporter.sendMail(mailOptions, function (err, info) {
      if (err)
        console.log(err)
      else
        console.log(info);
    });
  
  }
  
  module.exports = send