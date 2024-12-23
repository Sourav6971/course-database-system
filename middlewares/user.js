//middleware for handling auth
function userMiddleware(req, res, next) {
  //implementing user auth
  const username = req.headers.username;
  const password = req.headers.password;
}
module.exports = userMiddleware;
