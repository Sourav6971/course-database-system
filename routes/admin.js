const { Router } = require("express");
const adminMiddleware = require("../middlewares/admin");
const router = Router();
const { Admin, Course, User } = require("../db/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

//The below route is the endpoint of /admin/signup and not for /signup

router.post("/signup", async (req, res) => {
  //creating a route with input body {username:,password:} and returning a json of user created successfully
  const username = req.body.username;
  const password = req.body.password;

  //check if user with this username exists
  const value = await Admin.findOne({
    username: username,
  });

  if (value) {
    res.status(200).json({
      msg: "Admin already exists",
    });
  } else {
    await Admin.create({
      username, //same as username:username
      password, //same as password:password
    });
    res.status(200).json({
      msg: "Admin created successfully",
    });
  }
});
router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await Admin.findOne({
    username,
    password,
  });
  if (user) {
    const token = jwt.sign(
      {
        username,
      },
      secret
    );
    res.json({
      token,
    });
  } else {
    res.status(411).json({
      msg: "Incorrect username or password",
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  //implement course creation logic
  //user sends username and passwords as headers and body has title, description and price
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;
  const newCourse = await Course.create({
    title,
    description,
    imageLink,
    price,
  });
  console.log(newCourse);
  res.status(200).json({
    msg: "Course created successfully ",
    courseId: newCourse._id,
  });
});
router.get("/courses", adminMiddleware, async (req, res) => {
  //implement course fetching logic
  const response = await Course.find({});
  res.status(200).json(response);
});

module.exports = router;
