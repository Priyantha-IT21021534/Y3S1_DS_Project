// Dependencies
const {Vonage} = require('@vonage/server-sdk');

// Custom Files
const k = require("../constants");

//ping server
const pingSmsServer = async (req, res, next) => {
  var msg = "Ping to SMS server Successful!";
  try {
    return res.status(200).json({ message: msg });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error: "+ err });
  }
};
exports.pingSmsServer = pingSmsServer;





// Send sms (Vonage)
const sendSms = async (req, res, next) => {
  // get input data from rq body
  const {to, text} = req.body;

  // authenticatio ninfo for Vonage
  const vonage = new Vonage({
    apiKey: k.KEY,
    apiSecret: k.SECRET
  });

  // from - "AYU" - taken from constant file
  const from = k.FROM;

  // function to send SMS
  async function sendSMS() {
    await vonage.sms.send(
      {to, from, text}

      // when sms successful
    ).then(
      resp => { 
        console.log('Message sent successfully');
        console.log(resp);
        return res.status(200).json({message: "SMS Successfully Sent!"});
      }

      // if error
    ).catch(
      err => {
        console.log('There was an error sending the messages.');
        console.error(err);
        return res.status(500).json(err);
      }
    );
  }

  // using the function and send the sms via vonage
  sendSMS();
};
// exporting the api
exports.sendSms = sendSms;


// Send Dummy sms
const sendDummySms = async (req, res, next) => {
// get input from req data
  const {to, text} = req.body;

  // "From" taken from the constants folder
  const from = k.FROM;

  // function to check if mobile is invalid
  function invalidMobile(mobileNumber){
    const regex = /^\d{11}$/;
    return !regex.test(mobileNumber);
  }

  // function to send sms
  async function sendSMS() {
    var data = {
      "to": to,
      "from": from,
      "text": text
    };

    var reason, code, isError;

    // checking for errors in data

    // simulate error for development
    if(k.SIMULATE_SERVER_ERROR){
      isError = true;
      reason = "Internal Server Error";
      code = 500;
    
    // check if to is null
    }else if(to == null){
      isError = true;
      reason = "'to' is required. Received null";
      code = 400;

      // check if test is null
    }else if(text == null){
      isError = true;
      reason = "'text' is required. Received null";
      code = 400;

      // validate 
    }else if(invalidMobile(to)){
      isError = true;
      reason = "Invalid or Bad Format Mobile Number. Required Format Example: 94770000000";
      code = 400;
    }else{
      isError = false;
    }

    setTimeout(()=>{
      // if error
      if(isError){
        return res.status(code).json({
          message: "SMS Failed!",
          reason: reason,
          data: data
        });
      }else{
        // successful
        return res.status(200).json({
          message: "SMS succesful!",
          data: data
        });
      }
    }, 2000);
  }

  sendSMS();
};
//export api
exports.sendDummySms = sendDummySms;