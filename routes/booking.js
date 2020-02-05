const express = require("express");
const Booking = require("../model/booking");
const router = express.Router();

router
  .route("/")

  .post((req, res, next) => {
    let booking = new Booking(req.body);
    booking.authorG = req.guest._id;
    console.log(booking);
    booking
      .save()
      .then(booking => {
        res.statusCode = 201;
        res.json(booking);
      })
      .catch(next);
  })
  .get((req, res, next) => {
    Booking.find({ authorG: req.guest._id })
      .then(bookings => {
        console.log(bookings);
        res.json(bookings);
      })
      .catch(err => {
        next(err);
      });
  });


module.exports = router;
