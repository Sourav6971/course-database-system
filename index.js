const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

//middleware for parsing request body
app.use(bodyParser.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
