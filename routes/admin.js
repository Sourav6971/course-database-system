const { Router } = require("express");
const adminMiddleware = require("../middlewares/admin");
const router = Router();

//The below route is the endpoint of /admin/signup and not for /signup

router.post("/signup", (req, res) => {
  //creating a route with input body {username:,password:} and returning a json of user created successfully
  const username = req.body.username;
  const password = req.body.password;
  res.status(200).json({
    msg: "Admin created successfuly",
  });
});
router.post("/courses", adminMiddleware, (req, res) => {
  //implement course creation logic
});
router.get("/courses", adminMiddleware, (req, res) => {
  //implement course fetching logic
});

module.exports = router;
