const jwt = require("jsonwebtoken");
const Guest = require("../model/guest");
module.exports.verifyGuest = (req, res, next) => {
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    let err = new Error("Bearer token is not set!");
    err.status = 401;
    return next(err);
  }
  let token = authHeader.split(" ")[1];
  let data;
  try {
    data = jwt.verify(token, process.env.SECRET);
  } catch (err) {
    throw new Error("Token could not be verified!");
  }
  Guest.findById(data._id).then(guest => {
    req.guest = guest;
    next();
  });
};
