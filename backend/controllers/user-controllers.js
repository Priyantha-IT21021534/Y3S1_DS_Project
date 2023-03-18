const User = require('../model/user');

//importing bcrypt
const bcrypt = require("bcryptjs");

//importing jsonwebtoken
const jwt = require('jsonwebtoken');


const signUp = async(req, res, next) =>{

    const {name,  mobile, email,  address, password} = req.body;
    //chaecking whether user already sign up or not based on the mobile No
    let existingUser;


    try{
        existingUser = await User.findOne({email:email});
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
        password:hashedpassword
       // roles:roles || "buyer" 
        //"roles":[{"role":"buyer", "db":"DS_Project"}]
    });

    try{
        await user.save();//saving document into DB
    }catch(err){
        console.log(err);
    }

    return res.status(201).json({message:user})
}

const login = async(req, res, next) => {

    const {email, password} = req.body;

    let existingUser;

    try{
        existingUser = await User.findOne({email:email}) 
    }catch(err){
        return new Error(err);
    }

    if(!existingUser){
        return res.status(400).json({message:"User not found.Sign up please"})
    }

    
     //checking password
     const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

     if(!isPasswordCorrect){
         return res.status(400).json({message:"Invalid email/password"})
     }

       //sign is a function that can genarate the token
       //this token contains the id of the user and that id is encrypted
    const token =jwt.sign({id: existingUser._id}, process.env.JWT_SECRET_KEY, {

        expiresIn:"35s"//after this time token will expire

    });

    console.log("Generated Token\n", token);
    if (req.cookies[`${existingUser._id}`]) {
        req.cookies[`${existingUser._id}`] = "";
      }

    res.cookie(String(existingUser._id), token, {
        path:"/", 
        expires: new Date(Date.now()+ 1000*30),
        httpOnly:true, //if not provide http Only it will be accessible to the frontend
        sameSite:"lax",
    });

     //we send this msg along with he token and user details
    return res.status(200).json({message:"Successfully logged in", User:existingUser, token})

}

const verifyToken = (req, res, next) =>{

    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
    console.log(token);

    if(!token){
        res.status(404).json({message:"No token found"})
    }
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user)=>{
        if(err){
           return res.status(404).json({message:"Invalid token"})
        }
        console.log(user.id);
        req.id= user.id;
    })
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


const refreshToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
      return res.status(400).json({ message: "Couldn't find token" });
    }
    jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Authentication failed" });
      }
      res.clearCookie(`${user.id}`);
      req.cookies[`${user.id}`] = "";
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "35s",
      });
      console.log("Regenerated Token\n", token);
  
      res.cookie(String(user.id), token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 30), // 30 seconds
        httpOnly: true,
        sameSite: "lax",
      });
  
      req.id = user.id;
      next();
    });
  };

  const logout = (req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
      return res.status(400).json({ message: "Couldn't find token" });
    }
    jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Authentication failed" });
      }
      res.clearCookie(`${user.id}`);
      req.cookies[`${user.id}`] = "";
      return res.status(200).json({ message: "Successfully Logged Out" });
    });
  };

exports.login = login;
exports.signUp = signUp;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.refreshToken = refreshToken;
exports.logout = logout;