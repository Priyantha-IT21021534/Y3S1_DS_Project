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

  if(shipfrom == null || shipto == null || weight == null)
    return res.status(460).json({ message: "Required data missing" });

  var fromCoordinates;
  var toCoordinates;
  var duration;
  var distance;

  try{
    const fromResults = await getCoordinates(shipfrom);
    if(fromResults.status == "ok")
      fromCoordinates = [fromResults.coordinates[0],fromResults.coordinates[1]];
    else if(fromResults.status == "error")
      return res.status(461).json({ message: "Store address not found" });

    const toResults = await getCoordinates(shipto);
    if(toResults.status == "ok")
      toCoordinates = [toResults.coordinates[0],toResults.coordinates[1]];
    else if(toResults.status == "error")
      return res.status(462).json({ message: "Client address not found" });
      
    const distanceDuration = await getDistanceDuration(fromCoordinates, toCoordinates);
    if(distanceDuration.status == "ok"){
      duration = Math.ceil(distanceDuration.duration / 360) / 10; // seconds -> hours
      distance = Math.ceil(distanceDuration.distance / 1000); // meters -> km
    } else if(distanceDuration.status == "bad")
      return res.status(463).json({ message: "Out of range" });
    else if(distanceDuration.status == "error")
      return res.status(520).json({ message: distanceDuration.error });
   
    var rate = (duration + distance + weight * 5) * 10;
    rate = Math.ceil((rate + 1) / 10) * 10;
    if(rate < 100)
      rate = 100;

    const days = Math.ceil(duration / 24) + 1;

    console.log({
      from: fromCoordinates,
      to: toCoordinates,
      duration: duration,
      distance: distance,
      days: days,
      rate: rate
    })

    return res.status(200).json({
      days: days,
      rate: rate
    });
    
  }catch(e){
    console.error(e);
    return res.status(500).json({ message: "Server Error: "+ err });
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
    const distance = response.data.distances[0][1];

    console.log({
      duration: duration,
      disance: distance
    })

    if(duration == null || distance == null)
      return {"status":"bad","msg": "cannot be reached"};
    else
      return {"status":"ok","duration": duration, "distance": distance};
  }catch(e){
    console.log(e);
    return {"status":"error", "error": e};
  }
}