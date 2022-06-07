var express = require("express");
var router = express.Router();
const orderModel = require("../models/order.model");
var mongoose = require("mongoose");

/* GET all clients */
router.get("/list", (req, res) => {
  orderModel
    .find({})
    .populate("companyOrder")
    .populate("employeeOrder")
    .exec((err, data) => {
      if (!err) {
        res.send(data);
      } else {
        console.log(err);
      }
    });
});

/* GET specific client */
router.get("/order/:id", (req, res) => {
 orderModel
    .findById(req.params.id)
    .populate("companyOrder")
    .populate("employeeOrder")
    .exec((err, data) => {
      if (!err) {
        res.send(data);
        console.log(data)
      } else {
        console.log(err);
      }
    });
});

/* post client  */
router.post("/add", (req, res) => {
  const order = new orderModel(req.body);

  order.save((err, data) => {
    if (!err) {
      // res.send(data);
      res
        .status(200)
        .json({ code: 200, message: "Employee addedd", order: data });
    } else {
      console.log(err);
    }
  });
});

/* delete specific client */
router.delete("/order/:id", (req, res) => {
  orderModel.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      // res.send(data);
      res
        .status(200)
        .json({ code: 200, message: "Employee deleted", order: data });
    } else {
      console.log(err);
    }
  });
});

/* update specific client */
router.put("/order/update/:id", (req, res) => {
  const order = req.body;
  
  orderModel.findByIdAndUpdate(req.params.id,
    { $set: order },
    { new: true },
    (err, data) => {
      if (!err) {
        res.status(200).json({
          code: 200,
          message: "Employee updated",
          order: data,
        });
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
