const { Admin } = require("../db/index");

//middleware for handling auth
function adminMiddleware(req, res, next) {
  //implementing admin auth
  const username = req.headers.username;
  const password = req.headers.password;
  Admin.findOne({
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
module.exports = adminMiddleware;
