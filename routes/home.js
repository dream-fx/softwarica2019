const express = require("express");
const Home = require("../model/home");
const router = express.Router();

router.route("/").post((req, res, next) => {
  let home = new Home(req.body);
  home.hostName = req.home._id;
  console.log(home);
  home
    .save()
    .then(home => {
      res.statusCode = 201;
      res.json(home);
    })
    .catch(next);
});

module.exports = router;
