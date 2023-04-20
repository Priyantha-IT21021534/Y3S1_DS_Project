const User = require('../models/users');

//importing bcrypt
const bcrypt = require("bcrypt");

const validator = require('validator')
//importing jsonwebtoken
const jwt = require('jsonwebtoken');


const createToken = (_id, role) => {
    console.log(process.env.SECRET)
   return  jwt.sign({_id, role}, process.env.SECRET, {expiresIn: '60s'})
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

     
     //chaecking whether user already sign up or not based on the email
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

        const token = createToken(user._id, user.role) 

        res.cookie(String(user._id), token, {
          path: "/",
          expires: new Date(Date.now() + 1000*60),
          httpOnly:true,//if this option isn't here cookie will be visible to the frontend
          sameSite:"lax"
        })

        res.status(201).json({message:user, token})
    }catch(err){
        console.log(err);
        throw new Error('Error saving user');
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

     const token = createToken(loggeduser._id, loggeduser.role) 

     res.cookie(String(loggeduser._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000*60),
      httpOnly:true,//if this option isn't here cookie will be visible to the frontend
      sameSite:"lax"
    })


     //we send this msg along with he token and user details
    return res.status(200).json({message:"Successfully logged in", User:loggeduser, token})

}





  
  const getUser = async(req, res, next) =>{
    const userid = req.userId;
    let user;

    console.log("user ID (get USER)" + userid)
  
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
    let users;

    try{
      users = await User.find({});
  }catch(err){
      console.log(err)
  }

  if(!users){
      res.status(404).json({message:"There are no Users added"})
  }
  else{
      res.status(200).json({users})
  }

   }



   const logout = (req, res, next) => {
    const userid = req.userId;
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
      return res.status(400).json({ message: "Couldn't find token" });
    }
    jwt.verify(String(prevToken), process.env.SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Authentication failed" });
      }
      res.clearCookie(`${userid}`);
      req.cookies[`${userid}`] = "";
      return res.status(200).json({ message: "Successfully Logged Out" });
    });
  };

exports.signUp = signUp;
exports.login = login;
exports.getUser = getUser;
exports.getUsers = getUsers;
exports.logout = logout;


