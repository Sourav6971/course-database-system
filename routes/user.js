const { Router } = require("express");
router = Router();
const userMiddleware = require("../middlewares/user");

//The below route is endpoint for /user/signup and not for just /signup
router.post("/signup", (req, res) => {
  //logic for user signup
});
router.post("/courses", (req, res) => {
  //implement listing of all courses
});
router.post("/course/:courseId", userMiddleware, (req, res) => {
  //immplementing logic for purchasing courses
});
router.post("/purchasedCourses", userMiddleware, (req, res) => {
  //logic for showing purchased courses
});

module.exports = router;
