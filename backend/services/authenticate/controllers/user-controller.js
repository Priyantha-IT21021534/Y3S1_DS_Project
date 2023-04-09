const User = require('../models/users');

//importing bcrypt
const bcrypt = require("bcrypt");

const validator = require('validator')
//importing jsonwebtoken
const jwt = require('jsonwebtoken');

//const {permission} = require("../permission")

const createToken = (_id) => {
    console.log(process.env.SECRET)
   return  jwt.sign({_id}, process.env.SECRET, {expiresIn: '60s'})
}

const signUp = async(req, res, next) =>{

    const {name,  mobile, email,  address, password, role} = req.body;

    //validation
    if (!name || !mobile || !email || !address || !password) {
        throw Error('All fields must be filled')
      }

      //checking wheather password is valid or not
      if (!validator.isEmail(email)) {
        throw Error('Email not valid')
      }

     
     //chaecking whether user already sign up or not based on the mobile No
     let existingUser;

     try{
         existingUser = await User.findOne({email: email});
     }catch(err){
         console.log(err);
     }
     
     if(existingUser){
         return res.status(400).json({message:"User already exist...login instead "})
     }

     const salt = await  bcrypt.genSalt(6)
    //hashsync is a function that can hasing the password
    const hashedpassword = await bcrypt.hash(password, salt);

    const user = new User({
        name,  
        mobile, 
        email,  
        address,
        password:hashedpassword,
        role:role || "buyer"
    });

    try{
        await user.save();//saving document into DB

        const token = createToken(user._id) 

        res.status(201).json({message:user, token})
    }catch(err){
        console.log(err);
    }

}


const login = async(req, res, next) =>{

    const {email, password} = req.body;

    if (!email || !password) {
        throw Error('All fields must be filled')
      }

    let loggeduser;

    try{
        loggeduser = await User.findOne({email:email})
        
    }catch(err){
        return new Error(err);
    }

    if(!loggeduser){
        return res.status(400).json({message:"User not found.Sign up please"})
    }

     //checking password
     const isPasswordCorrect = bcrypt.compareSync(password, loggeduser.password);

     if(!isPasswordCorrect){
         return res.status(400).json({message:"Invalid mobile/password"})
     }

     const token = createToken(loggeduser._id) 

     //we send this msg along with he token and user details
    return res.status(200).json({message:"Successfully logged in", User:loggeduser, token})

}


const requireAuth = async(req, res, next) => {
    console.log(req.headers['authorization']);
  
    let token = req.headers['authorization'];
  
    console.log(process.env.SECRET)
  
    if(token){
      token = token.split(' ')[1];
      //console.log(token)
      jwt.verify(token, process.env.SECRET, (err, decoded)=>{
        if(err){
          console.log(err)
          res.status(401).json({message:"please provide a valid token"})
          
        }else{
          req.user = decoded;
          next();
        }
      })
    }
  else{
      res.status(403).json({message:"Please provide a token"})
    }
  }
  

   const ensureAdmin = async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
      if (user.role === 'seller') {
        next();
      } else {
        throw new Error('Only sellers can do this');
      }
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  };

exports.signUp = signUp;
exports.login = login;
exports.requireAuth = requireAuth;
exports.ensureAdmin = ensureAdmin;