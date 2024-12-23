const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL);

//defining the admin schema
const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

//defining the user schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourse: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

//defining the course schema
const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageLink: String,
  price: Number,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
