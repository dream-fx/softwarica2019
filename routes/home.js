const express = require("express");
const Home = require("../model/home");
const router = express.Router();

router
  .route("/")

  .post((req, res, next) => {
    let home = new Home(req.body);
    home.author = req.host._id;
    console.log(home);
    home
      .save()
      .then(home => {
        res.statusCode = 201;
        res.json(home);
      })
      .catch(next);
  })
  .get((req, res, next) => {
    Home.find({ author: req.host._id })
      .then(homes => {
        console.log(homes);
        res.json(homes);
      })
      .catch(err => {
        next(err);
      });
  });



router.route("/:homeName").get((req, res, next) => {
    Home.find({ homeName: req.params.homeName })
      .then(homes => {
        console.log(homes);
        res.json(homes);
      })
      .catch(err => {
        next(err);
      });
  });
  
  
module.exports = router;
