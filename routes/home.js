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
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(homes);
      })
      .catch(err => {
        next(err);
      });
  });

router.route("/:homeName").get((req, res, next) => {
  //here may be a problem
  Home.find({ author: req.params.homeName })
    .then(homes => {
      console.log(homes);
      res.json(homes);
    })
    .catch(err => {
      next(err);
    });
});

router
  .route("/:id")
  .put((req, res, next) => {
    console.log(req.body);
    Home.findOneAndUpdate(
      { author: req.host._id, _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
      .then(reply => {
        if (reply == null) throw new Error("Home not found");
        res.json(reply);
      })
      .catch(next);
  })

  .delete((req, res, next) => {
    Home.findOneAndDelete({ author: req.host._id, _id: req.params.id })
      .then(home => {
        if (home == null) throw new Error("Home not found");
        res.json(home);
      })
      .catch(next);
  });

module.exports = router;
