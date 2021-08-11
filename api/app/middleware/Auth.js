const { config } = require("../config/config");
const jwt = require("jsonwebtoken");

let checkToken = (req, res, next) => {
   const token = req.headers['x-access-token'] || req.headers['authorization'];
   if(token) {
      jwt.verify(token, config.secret, (err, decode) => {
         if(err) {
            return res.status(403).send("Error: token is not valid");
         }
         req.decode = decode;
         next();
      })
   }else {
      return res.status(403).send("Error: token is not valid");
   }
}

module.exports = checkToken;