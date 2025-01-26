const jwt = require("jsonwebtoken");
require("dotenv").config();
//middleware for handling auth
function userMiddleware(req, res, next) {
  //implementing user auth with jwt
  const token = req.headers.authorization;
  //the token would look like Bearer afsdgetsgdhesh....
  const words = token.split(" ");
  const jwtToken = words[1];
  const secret = process.env.JWT_SECRET;
  const decodedValue = jwt.verify(jwtToken, secret);

  try {
    if (decodedValue.username) {
      //saving the username got from the jwt token
      req.username = decodedValue.username;
      next();
    } else {
      res.status(403).json({
        msg: "you are not authenticated",
      });
    }
  } catch (e) {
    res.status(404).json({
      err: "invalid token",
    });
  }
}
module.exports = userMiddleware;
