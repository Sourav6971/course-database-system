const { Router, request } = require("express");
router = Router();
const userMiddleware = require("../middlewares/user");
const { User, Course } = require("../db");
const { default: mongoose } = require("mongoose");

//The below route is endpoint for /user/signup and not for just /signup
router.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.create({
    username,
    password,
  });
  res.json({
    msg: "User created successfuly",
  });
});
router.post("/courses", async (req, res) => {
  //implement listing of all courses
  const response = await Course.find({});
  res.json({
    course: response,
  });
});
router.post("/course/:courseId", userMiddleware, async (req, res) => {
  //immplementing logic for purchasing courses
  //important one
  const courseId = req.params.courseId;
  const username = req.headers.username;
  await User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourse: new mongoose.Types.ObjectId(courseId),
      },
    }
  ).catch((e) => {
    console.log(e);
  });
  res.json({
    msg: "course added successfully",
  });
});
router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  //logic for showing purchased courses
  const username = req.headers.username;
  const user = await User.findOne({
    username,
  });
  console.log(user.purchasedCourse);
  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourse,
    },
  });
  res.json({
    courses: courses,
  });
});

module.exports = router;
