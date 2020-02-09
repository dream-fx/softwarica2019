const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv").config();

const GuestRouter = require("./routes/guest");
const HostRouter = require("./routes/host");
const HomeRouter = require("./routes/home");
const BookingRouter = require("./routes/booking");
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

app.use("/guest", GuestRouter);
app.use("/upload", Upload);
app.use("/host", HostRouter);

//app.use(auth.verifyGuest);
//app.use(auth.verifyHost);
app.use("/home", auth.verifyHost,HomeRouter);
// app.use("/booking", Booking);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.statusCode = 500;
  res.json({ status: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`App is running at localhost:${process.env.PORT}`);
});
