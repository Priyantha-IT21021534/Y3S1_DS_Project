// Dependencies
const axios = require('axios');

// Custom Files
const k = require("../constants");





//ping server
const pingDeliveryServer = async (req, res, next) => {
  var msg = "Ping to Delivery server Successful!";
  try {
    return res.status(200).json({ message: msg });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error: "+ err });
  }
};
exports.pingDeliveryServer = pingDeliveryServer;





// Get Rates
const getRate = async(req, res, next) => {
  const {shipfrom, shipto, weight} = req.body;

  var fromCoordinates;
  var toCoordinates;
  var duration;
  var distance;

  try{
    const fromResults = await getCoordinates(shipfrom);
    if(fromResults.status == "ok")
      fromCoordinates = [fromResults.coordinates[0],fromResults.coordinates[1]];

    const toResults = await getCoordinates(shipto);
    if(toResults.status == "ok")
      toCoordinates = [toResults.coordinates[0],toResults.coordinates[1]];

    const distanceDuration = await getDistanceDuration(fromCoordinates, toCoordinates);
    if(distanceDuration.status == "ok"){
      duration = distanceDuration.duration;
      distance = distanceDuration.distance;
    }
    console.log(duration +", "+ distance +", "+ weight);

    //TODO: create a equation to calculate rate
  }catch(e){
    console.error(e);
  }

};
exports.getRate = getRate;





//Custom function to retrieve coordinates
async function getCoordinates(address){
  try{
    const response = await axios.get(`${k.GEOCODE_URL_PREFIX}${address}${k.GEOCODE_URL_SUFFIX}`);
    const coordinates = response.data.features[0].geometry.coordinates;
    return {"status":"ok","coordinates": coordinates};
  }catch(e){
    return {"status":"error", "error": e};
  }
}

//Custom function to retrieve duration
async function getDistanceDuration(location1, location2){
  try{
    const config = {
      headers: {
        Authorization : k.API_KEY
      }
    };

    const data = {
      locations: [location1,location2],
      metrics: ["distance","duration"]
    };
    
    const response = await axios.post(k.DURATION_URL, data, config);
    const duration = response.data.durations[0][1];
    const disance = response.data.distances[0][1];

    return {"status":"ok","duration": duration, "distance": disance};
  }catch(e){
    console.log(e);
    return {"status":"error", "error": e};
  }
}