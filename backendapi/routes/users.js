var express = require("express");
var router = express.Router();
const userModel = require("../models/user.model");
var mongoose = require("mongoose");
var bcryptjs = require("bcryptjs");
var jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth");
const multipart = require("connect-multiparty");
const multiparMiddle = multipart({ uploadDir: "./public/images" });

/* GET all Users */
router.get("/list", (req, res) => {
  userModel.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});

router.post("/add/", (req, res) => {
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

/* GET specific User */
router.get("/user/:id", (req, res) => {
  userModel.findById(req.params.id, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});
/* Verif email */
router.get("/user/email_verif/:emailUser", (req, res) => {
  userModel.findOne({ emailUser: req.params.emailUser }, (err, data) => {
    if (data) {
      res.json(req.params.emailUser);
    } else {
      res.json("email@email.com");
    }
  });
});

/* delete specific user */
router.delete("/user/del/:id", (req, res) => {
  userModel.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      // res.send(data);
      res
        .status(200)
        .json({ code: 200, message: "User deleted", deletUser: data });
    } else {
      console.log(err);
    }
  });
});

/* update specific client */
router.put("/user/update/:id", (req, res) => {
  const user = req.body;
  userModel.findByIdAndUpdate(
    req.params.id,
    { $set: user },
    { new: true },
    (err, data) => {
      if (!err) {
        res.status(200).json({
          code: 200,
          message: "User Updated Successfully",
        });
      } else {
        console.log(err);
      }
    }
  );
});

router.post("/upload/", multiparMiddle, (req, res) => {
  var file = req.files.uploads;
  res.send(file[0]);
});

module.exports = router;
