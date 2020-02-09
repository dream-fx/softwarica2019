const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Guest = require("../model/guest");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/signup", (req, res, next) => {
  let guestPassword = req.body.guestPassword;
  bcrypt.hash(guestPassword, 10, function(err, hash) {
    if (err) {
      throw new Error("Could not hash!");
    }
    Guest.create({
      guestName: req.body.guestName,
      guestUsername: req.body.guestUsername,
      guestPassword: hash,
      guestImage: req.body.guestImage,
      guestBio: req.body.guestBio,
      guestGender: req.body.guestGender,
      guestDob: req.body.guestDob
      // guestCreatedAt: req.body.guestCreatedAt
    })
      .then(guest => {
        let token = jwt.sign({ _id: guest._id }, process.env.SECRET);
        res.json({ status: "Signup success!", token: token });
      })
      .catch(next);
  });
});

router.post("/login", (req, res, next) => {
  Guest.findOne({ guestUsername: req.body.guestUsername })
    .then(guest => {
      if (guest == null) {
        let err = new Error("Traveler not found!");
        err.status = 401;
        return next(err);
      } else {
        bcrypt
          .compare(req.body.guestPassword, guest.guestPassword)
          .then(isMatch => {
            if (!isMatch) {
              let err = new Error("Password does not match!");
              err.status = 401;
              return next(err);
            }
            let token = jwt.sign({ _id: guest._id }, process.env.SECRET);
            res.json({ status: "Login success!", token: token });
          })
          .catch(next);
      }
    })
    .catch(next);
});

router.get("/profile", auth.verifyGuest, (req, res, next) => {
  res.json({
    _id: req.guest._id,
    guestName: req.guest.guestName,
    guestUsername: req.guest.guestUsername,
    guestImage: req.guest.guestImage
  });
});

router.put("/updateprofile", auth.verifyGuest, (req, res, next) => {
  Guest.findByIdAndUpdate(req.guest._id, { $set: req.body }, { new: true })
    .then(guest => {
      res.json({
        _id: guest._id,
        guestName: req.guest.guestName,
        guestUsername: req.guest.guestUsername,
        guestImage: guest.guestImage,
        guestBio: guest.guestBio
      });
    })
    .catch(next);
});

module.exports = router;
