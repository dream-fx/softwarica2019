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


router.route("/:id").get((req, res, next) => {
    Booking.findOne({ author: req.guest._id, _id: req.params.id })
      .then(booking => {
          if (task == null) throw new Error("Booking not found!")
        res.json(booking);
      })
      .catch(err => {
        next(err);
      });
  })
  .post((req, res) => {
      res.statusCode = 405;
      res.json({ message: "Method not allowed" });
  })
  
  .put((req, res, next) => {
    console.log(req.body);
    Booking.findOneAndUpdate(
      { authorG: req.guest._id, _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
      .then(reply => {
        if (reply == null) throw new Error("Booking not found");
        res.json(reply);
      })
      .catch(next);
  })

  .delete((req, res, next) => {
    Booking.findOneAndDelete({ author: req.guest._id, _id: req.params.id })
      .then(home => {
        if (home == null) throw new Error("Booking not found");
        res.json(home);
      })
      .catch(next);
  });

module.exports = router;
