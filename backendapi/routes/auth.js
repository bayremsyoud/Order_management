var express = require("express");
var router = express.Router();
const userModel = require("../models/user.model");
var mongoose = require("mongoose");
var bcryptjs = require("bcryptjs");
var jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth");




router.post("/register/", (req, res) => {
    const user = new userModel(req.body);
  
    user.save((err, data) => {
      if (!err) {
        // res.send(data);
        res.status(200).json({
          code: 200,
          message: "User Added Successfully",
          data: data,
        });
      } else {
        console.log(err);
      }
    });
  });
  

router.post("/login", (req, res) => {
  let userFound;
  userModel
    .findOne({ emailUser: req.body.email })
    .then((user) => {
      if (!user) {
        return res.send("Invalid email or password");
      }
      console.log(user);
      userFound = user;
      return bcryptjs.compare(req.body.password, user.passUser);
    })
    .then((result) => {
      if (!result) {
        return res.send("Invalid password");
      } else {
          if (!userFound.isActive) {
            return res.send("user not Active");
          } else {
            if (!userFound.isBlocked) {
              const token = jwt.sign({ id: userFound._id }, "bayrem", {
                expiresIn: "1h",
              });

              res.status(200).json({ token: token, user: userFound });
            } else {
              return res.send("user isBlocked");
            }
          }
      }
    })
    .catch((err) => {
      return res.status(401).json({ message: "Unauthorized" });
    });
});



router.post("/logout", (req, res) => {
  jwt.decode(req.body);
  res.send("Logout successful");
});

module.exports = router;
