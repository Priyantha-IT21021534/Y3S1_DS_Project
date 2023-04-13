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


 

exports.signUp = signUp;
exports.login = login;
exports.getUser = getUser;
exports.getUsers = getUsers;



/*

const requireAuth = async(req, res, next) => {
   
  console.log(req.headers['authorization']);
  
    let token = req.headers.authorization.split(' ')[1];

    if(!token){
      return res.status(403).send("A token is required for authentication.");
}

  try{
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log("af  "+decoded._id)
    req.user = await User.findById({_id:decoded._id});
    console.log("next")
    next();

  }catch(err){
    console.error(err);
    return res.status(401).send(new Error('Invalid token'));
  }

  }


  const checkSellerAccess = async(req, res, next)=>{
    if (req.user.role !== roles.buyer&&req.user.role !== roles.admin){
      return next (new ErrorResponse('Access denied, you must be an seller', 401));
  }
  next()
}
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
          
      console.log("here is checked requestAuth ")
          next();

        }
      })
    }
  else{
      res.status(403).json({message:"Please provide a token"})
    }




     const checkSellerAccess = async(req, res, next)=>{
    try{
        const role = await User.findById(req.user._id);

        console.log(role)
        console.log("Seller access granted");
        if(role.role === roles.seller){
            
            next();
        } else {
            console.log("Access denied. You are not a seller.");
            return res.status(403).json({message:"Access denied. you are not a seller"})
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}
*/