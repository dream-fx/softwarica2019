const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Host = require("../model/host");
const router = express.Router();
const auth = require("../auth");

router.post("/hsignup", (req, res, next) => {
  let hostPassword = req.body.hostPassword;
  bcrypt.hash(hostPassword, 10, function(err, hash) {
    if (err) {
      throw new Error("Could not hash!");
    }
    Host.create({
      hostName: req.body.hostName,
      hostUsername: req.body.hostUsername,
      hostPassword: hash,
      hostImage: req.body.hostImage,
      hostEmail: req.body.hostEmail,
      hostLocation: req.body.hostLocation,
      hostBio: req.body.hostBio,
      hostGender: req.body.hostGender,
      hostDob: req.body.hostDob,
      hostCreatedAt: req.body.hostCreatedAt
    })
      .then(host => {
        let token = jwt.sign({ _id: host._id }, process.env.SECRET);
        res.json({ status: "Signup success!", token: token });
      })
      .catch(next);
  });
});

router.post("/hlogin", (req, res, next) => {
  Host.findOne({ hostUsername: req.body.hostUsername })
    .then(host => {
      if (host == null) {
        let err = new Error("Host not found!");
        err.status = 401;
        return next(err);
      } else {
        bcrypt
          .compare(req.body.hostPassword, host.hostPassword)
          .then(isMatch => {
            if (!isMatch) {
              let err = new Error("Password does not match!");
              err.status = 401;
              return next(err);
            }
            let token = jwt.sign({ _id: host._id }, process.env.SECRET);
            res.json({ status: "Login success!", token: token });
          })
          .catch(next);
      }
    })
    .catch(next);
});

router.get("/hprofile", auth.verifyHost, (req, res, next) => {
  res.json({
    _id: req.host._id,
    hostName: req.host.hostName,
    hostUsername: req.host.hostUsername,
    hostImage: req.host.hostImage,
    hostEmail: req.host.hostEmail,
    hostLocation: req.host.hostLocation,
    hostBio: req.host.hostBio,
    hostGender: req.host.hostGender,
    hostDob: req.host.hostDob,
    hostCreatedAt: req.host.hostCreatedAt
  });
});

router.put("/hprofileup", auth.verifyHost, (req, res, next) => {
  Host.findByIdAndUpdate(req.host._id, { $set: req.body }, { new: true })
    .then(host => {
      res.json({
        _id: host._id,
        hostName: req.host.hostName,
        hostUsername: req.host.hostUsername,
        hostImage: host.hostImage,
        hostEmail: req.host.hostEmail,
        hostLocation: req.host.hostLocation,
        hostBio: req.host.hostBio,
        hostGender: req.host.hostGender,
        hostDob: req.host.hostDob,
        hostCreatedAt: req.host.hostCreatedAt
      });
    })
    .catch(next);
});

module.exports = router;
