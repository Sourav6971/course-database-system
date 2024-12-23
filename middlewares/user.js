const { User, Admin } = require("../db/index");
//middleware for handling auth
function userMiddleware(req, res, next) {
  //implementing user auth
  const username = req.headers.username;
  const password = req.headers.password;
  User.findOne({
    username: username,
    password: password,
  }).then((value) => {
    if (value) {
      next();
    } else {
      res.status(403).json({
        msg: "User does not exist",
      });
    }
  });
}
module.exports = userMiddleware;
