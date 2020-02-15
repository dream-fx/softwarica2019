const express = require("express");
const Wishlist = require("../model/wishlist");
const router = express.Router();

router
  .route("/")
  .post((req, res, next) => {
    let wishlist = new Wishlist(req.body);
    wishlist.author = req.guest._id;
    console.log(wishlist);
    wishlist
      .save()
      .then(wishlist => {
        res.statusCode = 201;
        res.json(wishlist);
      })
      .catch(next);
  })
  .get((req, res, next) => {
    Wishlist.find({ author: req.guest._id })
      .then(wishlist => {
        console.log(wishlist);
        res.json(wishlist);
      })
      .catch(err => {
        next(err);
      });
  });


router.route("/:wishName").delete((req, res, next) => {
  console.log(req.params);
  Wishlist.findOneAndDelete({
    author: req.guest._id,
    wishName: req.params.wishName
  })
    .then(wishlist => {
      if (wishlist == null) throw new Error("product not found");
      res.json(wishlist);
    })
    .catch(next);
});

router.route("/:id").delete((req, res, next) => {
  console.log(req.params);
  Wishlist.findOneAndDelete({ author: req.guest._id, _id: req.params.id })
    .then(wishlist => {
      if (wishlist == null) throw new Error("product not found");
      res.json(wishlist);
    })
    .catch(next);
});
module.exports = router;
