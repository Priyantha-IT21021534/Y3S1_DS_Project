// Dependencies
const nodemailer = require('nodemailer');

// Custom Files
const k = require("../constants");


//ping server
const pingEmailServer = async (req, res, next) => {
  var msg = "Ping to Email server Successful!";
  try {
    return res.status(200).json({ message: msg });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error: "+ err });
  }
};
// exporting the api
exports.pingEmailServer = pingEmailServer;


// Send email 
const sendMail = async (req, res, next) => {

  // get input data from request body
  const {to, subject, message} = req.body;

  // create "Transporter" from 'nodemailer' to hold
  // authentication data and service type
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: k.SERVICE_EMAIL,
      pass: k.MAIL_SERVICE_PASS
    }
  });
  
  // mail options to, from, etc..
  var mailOptions = {
    from: k.SERVICE_EMAIL,
    to: to,
    subject: subject,
    text: message
  };
  
  // sending mail using above data
  transporter.sendMail(mailOptions, function(error, info){
    // if error response
    if (error) {
      console.log(error);
      // if gmail login credentials are invalid
      if(error.responseCode == 535){
        return res.status(401).json({
          message: "Authentication Failed!"
        });
      }else{
        // other error except authentication
        return res.status(500).json(error);
      }
      
      // If email is successful
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json({message: "Mail Successfully Sent!"});
    }
  });
};
// exporting the api
exports.sendMail = sendMail;