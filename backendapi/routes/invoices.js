var express = require("express");
var router = express.Router();
const invoiceModel = require("../models/invoice.model");
var mongoose = require("mongoose");
const multipart = require("connect-multiparty");
const multiparMiddle = multipart({ uploadDir: "./pdfs" });

/* GET all clients */
router.get("/list", (req, res) => {
  invoiceModel
    .find({}).populate("companyInvoice")
    .populate("orderInvoice")
    .exec((err, data) => {
      if (!err) {
        res.send(data);
      } else {
        console.log(err);
      }
    });
});

/* GET specific company */
router.get("/invoice/:id", (req, res) => {
  invoiceModel
    .findById(req.params.id).populate("companyInvoice")
    .populate("orderInvoice")
    .exec((err, data) => {
      if (!err) {
        res.send(data);
      } else {
        console.log(err);
      }
    });
});

/* post client  */
router.post("/add/", (req, res) => {
  const invoice = new invoiceModel(req.body);
  console.log(invoice)

  invoice.save((err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});

/* delete specific client */
router.delete("/invoice/:id", (req, res) => {
  invoiceModel.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      // res.send(data);
      res
        .status(200)
        .json({ code: 200, message: "Invoice deleted", deleteInvoice: data });
    } else {
      console.log(err);
    }
  });
});

/* update specific client */
router.put("/invoice/update/:id", (req, res) => {
  const invoice = req.body;
  invoiceModel.findByIdAndUpdate(
    req.params.id,
    { $set: invoice },
    { new: true },
    (err, data) => {
      if (!err) {
        res.status(200).json({
          code: 200,
          message: "Invoice Updated",
          updateInvoice: data,
        });
      } else {
        console.log(err);
      }
    }
  );
});



router.post("/upload/", multiparMiddle, (req, res) => {
  var file = req.files.pdf;
  res.send(file);
});

module.exports = router;
