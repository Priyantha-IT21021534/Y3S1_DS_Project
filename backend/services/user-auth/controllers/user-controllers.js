const User = require('../model/user');
const { roles } = require('../roles');

//importing bcrypt
const bcrypt = require("bcryptjs");


//importing jsonwebtoken
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = "mykey";
////////////////////

const signUp = async(req, res, next) =>{

    const {name,  mobile, email,  address, password, role} = req.body;

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

    //hashsync is a function that can hasing the password
    const hashedpassword = bcrypt.hashSync(password);

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
    }catch(err){
        console.log(err);
    }

    return res.status(201).json({message:user})
}

const login = async(req, res, next) =>{

    const {email, password} = req.body;

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

     //sign is a function that can genarate the token
    const token =jwt.sign({id: loggeduser._id}, JWT_SECRET_KEY, {

        expiresIn:"60s"

    });

    res.cookie(String(loggeduser._id), token, {
        path:"/", 
        expires: new Date(Date.now()+ 1000*60),
        httpOnly:true, //if not provide http Only it will be accessible to the frontend
        sameSite:"lax",
    });

     //we send this msg along with he token and user details
    return res.status(400).json({message:"Successfully logged in", User:loggeduser, token})

}

 ///////////////////////////////
const grantAccess = function(action, resource) {
 return async (req, res, next) => {
  try {
   const permission = roles.can(req.user.role)[action](resource);
   if (!permission.granted) {
    return res.status(401).json({
     error: "You don't have enough permission to perform this action"
    });
   }
   next();
  } catch (error) {
   next(error)
  }
 }
}

const allowIfLoggedin = async (req, res, next) => {
    try {
     const user = res.locals.loggedInUser;
     if (!user)
      return res.status(401).json({
       error: "You need to be logged in to access this route"
      });
      req.user = user;
      next();
     } catch (error) {
      next(error);
     }
   }

////////////////////////


const verifyToken = async(req, res, next) =>{

    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
    console.log(token);

    if(!token){
        res.status(404).json({message:"No token found"})
    }
    jwt.verify(String(token), JWT_SECRET_KEY, (err, user)=>{
        if(err){
           return res.status(404).json({message:"Invalid token"})
        }
        console.log(user.id);
        req.id= user.id;
       
    })
    res.locals.loggedInUser = await User.findById(req.id);/////////
    next();

}


const getUser = async(req, res, next) =>{
    const userid = req.id;
    let user;

    try{
        user = await User.findById(userid, "-password"); //this minus operator is used to restrict getting user password.But other details will get                                                     
     }catch(err){
        return new Error(err)
    }

    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    return res.status(200).json({user});
}
const getUsers = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
     data: users
    });
   }

const updateUser = async (req, res, next) => {
    let id = req.params.id;
    
   // const {name, author, description, price, available, image} = req.body;
    let user;

    try{
        user = await User.findByIdAndUpdate(id, req.body, {new:true});

       // await book.save();

    }catch(err){
        console.log(err)
    }

    if(!user){
        res.status(500).json({message:"Cannot Update!"})
    }

    else{
        return res.json({message:"User successfully updated"})
    }

}

const deleteUser = async(req, res, next)=>{

    const id = req.params.id;

    let user;

    try{
        user = await User.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }

    if(!user){
        res.status(500).json({message:"Cannot Delete!"})
    }

    return res.status(200).json({message:"User is succesfully deleted"})
}

exports.signUp = signUp;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.getUsers = getUsers;
exports.grantAccess = grantAccess;
exports.allowIfLoggedin = allowIfLoggedin;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;


