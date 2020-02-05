const express = require("express");
//const bodyParser = require("body-parser");
//const path = require("path");
const cors = require("cors");
//const multer = require("multer");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv").config();

//require("./dbconfig/db");
const Guest = require("./routes/guest");
const Host = require("./routes/host");
const Home = require("./routes/home");
const Booking = require("./routes/booking");
const auth = require("./middleware/auth");
const Upload = require("./routes/upload");

const app = express();
app.options("*", cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(
    db => {
      console.log("Successfully connected to MongodB server");
    },
    err => console.log(err)
  );

app.use("/guest", Guest);
app.use("/upload", Upload);
app.use(auth.verifyGuest);
// app.use("/host", Host);
// app.use("/home", Home);
// app.use("/booking", Booking);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.statusCode = 500;
  res.json({ status: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`App is running at localhost:${process.env.PORT}`);
});
