const express = require("express");
const Inbox = require("../model/inbox");
const router = express.Router();

router
  .route("/")

  .post((req, res, next) => {
    let inbox = new Inbox(req.body);
    inbox.author = req.host._id;
    console.log(inbox);
    inbox
      .save()
      .then(inbox => {
        res.statusCode = 201;
        res.json(inbox);
      })
      .catch(next);
  })
  .get((req, res, next) => {
    Inbox.find({ author: req.host._id })
      .then(inboxs => {
        console.log(inboxs);
        res.json(inboxs);
      })
      .catch(err => {
        next(err);
      });
  });