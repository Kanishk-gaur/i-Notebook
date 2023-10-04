var jwt = require("jsonwebtoken");
const JWT_SECRET = 'kanishk0sagoodboy';

const fetchuser=(req,res,next)=>{
  const token=req.header('auth-token');
  if(!token){
    req.status(401).send({error:"please authanthicate"})
  }
  try {
    const data=jwt.verify(token,JWT_SECRET);
    req.user=data.user;
    next();
  } catch (error) {
    req.status(401).send({error:"please authanthicate"})
  }
 
}

module.exports =fetchuser;