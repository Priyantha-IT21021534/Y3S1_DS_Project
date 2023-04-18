const {roles}=require("../authenticate/models/roles")
const User = require("../authenticate/models/users")
const jwt = require('jsonwebtoken');

let decoded;
let roleOne;
const requireAuth = async(req, res, next) => {
   

    const cookie = req.headers.cookie;
    const token = cookie.split("=")[1];
    
      if(!token){
        return res.status(403).send("A token is required for authentication.");
  }

    try{
      decoded = jwt.verify(token, process.env.SECRET);
      console.log("user Id  "+decoded._id)
      req.userId = decoded._id;
      roleOne =  decoded.role;
      console.log(roleOne)
      console.log("req.userId  "+req.userId)
      
      next();
  
    }catch(err){
      console.error(err);
      return res.status(401).send(new Error('Invalid token'));
    }
  
    }

    const requireRoleSeller = async(req, res, next)=> {
      console.log(decoded.role)
    if (decoded.role === roles.seller) {
      next();
    } else {
      res.status(403).json({ message: 'Unauthorized' });
    }
  
  }
    const requireRoleAdmin = async(req, res, next)=> {
      if (decoded.role === roles.admin) {
        next();
      } else {
        res.status(403).json({ message: 'Unauthorized' });
      }
    
  }

  const requireRoleBuyer = async(req, res, next)=> {
    if (decoded.role === roles.buyer) {
      next();
    } else {
      res.status(403).json({ message: 'Unauthorized' });
    }
  
}




exports.requireAuth = requireAuth
exports.requireRoleSeller = requireRoleSeller;
exports.requireRoleAdmin = requireRoleAdmin;
exports.requireRoleBuyer = requireRoleBuyer;
