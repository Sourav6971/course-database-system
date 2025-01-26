const jwt = require("jsonwebtoken");
require("dotenv").config();

//middleware for handling auth
async function adminMiddleware(req, res, next) {
  //implementing admin auth for jwt tokens
  const token = req.headers.authorization;
  //the token would look like Bearer afsdgetsgdhesh....
  const words = token.split(" ");
  const jwtToken = words[1];
  const secret = process.env.JWT_SECRET;

  try {
    const decodedValue = jwt.verify(jwtToken, secret);

    if (decodedValue.username) {
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
module.exports = adminMiddleware;
