const jwt = require('jsonwebtoken')
const User = require("./models/users")
//const jwtSecret = process.env.SECRET;
const requireAuth = async(req, res, next) => {
  console.log(req.headers['authorization']);

  let token = req.headers['authorization'];

  console.log(process.env.SECRET)

  if(token){
    token = token.split(' ')[1];
    //console.log(token)
    jwt.verify(token , process.env.SECRET, (err, valid)=>{
      if(err){
        console.log(err)
        res.status(401).json({message:"please provide a valid token"})
        
      }else{
        next();
      }
    })
  }
else{
    res.status(403).json({message:"Please provide a token"})
  }
}

/*
const requireAuth = async (req, res, next) => {
  // verify user is authenticated or not
  const  {authorization}  = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  //getting token from authorization
  const token = authorization.split(' ')[1]
  try {

    //verifing the token and grab the id of the user
    const { _id } = jwt.verify(token, process.env.SECRET)

    req.user = await User.findOne({ _id }).select('_id')//only select id property from the user
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}
*/
const onlySeller = async(req, res, next) =>{
    if (req.User.role === 'seller') {
        next();
      } else {
        res.status(403).json({ message: 'Access denied' });
      }
}



exports.requireAuth = requireAuth
exports.onlySeller = onlySeller