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





// Send sms
const sendSms = async (req, res, next) => {

  const {to, text} = req.body;

  const vonage = new Vonage({
    apiKey: k.KEY,
    apiSecret: k.SECRET
  });
  const from = k.FROM;

  async function sendSMS() {
    await vonage.sms.send(
      {to, from, text}

    ).then(
      resp => { 
        console.log('Message sent successfully');
        console.log(resp);
        return res.status(200).json({message: "SMS Successfully Sent!"});
      }

    ).catch(
      err => {
        console.log('There was an error sending the messages.');
        console.error(err);
        return res.status(500).json(err);
      }
    );
  }

  sendSMS();
};
exports.sendSms = sendSms;





// Send Dummy sms
const sendDummySms = async (req, res, next) => {

  const {to, text} = req.body;

  const from = k.FROM;

  async function sendSMS() {
    var isError = k.SIMULATE_ERROR;

    var data = {
      "To": to,
      "From": from,
      "Text": text
    };

    setTimeout(() => {
      if(!isError){
        console.log(`SMS successful`);
        return res.status(200).json({
          message: "Message Sent Successfully!",
          data: data
        }); 
      }else{
        console.log('SMS Failed');
        return res.status(500).json({
          err: "Error in Sending SMS",
          data: data
        });
      }
    }, 3000);
  }

  sendSMS();
};
exports.sendDummySms = sendDummySms;