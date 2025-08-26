require("dotenv").config(); 
const jwt = require('jsonwebtoken');
const secret =  process.env.JWT_SECRET_KEY;

module.exports.createAccessToken = (user) => { 
  
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    };
    return jwt.sign(data, secret); 
};

module.exports.verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Auth header:", authHeader); 
  if (!authHeader) return res.status(401).send({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  console.log("Token:", token);
  console.log("JWT secret being used:", secret);
  if (!token) return res.status(401).send({ message: "Invalid token format" });

  try {
    const decoded = jwt.verify(token, secret); 
    console.log("Decoded token:", decoded); 
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).send({ message: "Invalid token" });
  }
};
