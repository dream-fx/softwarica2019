const express = require("express");
const Review = require("../model/review");
const router = express.Router();

router
  .route("/")

  .post((req, res, next) => {
    let review = new Inbox(req.body);
    review.author = req.host._id;
    console.log(review);
    review
      .save()
      .then(review => {
        res.statusCode = 201;
        res.json(review);
      })
      .catch(next);
  })
  .get((req, res, next) => {
    Review.find({ author: req.host._id })
      .then(reviews => {
        console.log(reviews);
        res.json(reviews);
      })
      .catch(err => {
        next(err);
      });
  });