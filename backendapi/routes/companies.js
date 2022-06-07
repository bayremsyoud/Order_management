var express = require("express");
var router = express.Router();
const companyModel = require("../models/company.model");
var mongoose = require("mongoose");

/* GET all ccompany */
router.get("/list", (req, res) => {
  companyModel.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});

/* GET specific company */
router.get("/company/:id", (req, res) => {
  companyModel.findById(req.params.id, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});

router.get("/company/email_verif/:emailCompany", (req, res) => {
  companyModel.findOne({ emailCompany: req.params.emailCompany }, (err, data) => {
    if (data) {
      res.json(req.params.emailcompany);
    } else {
      res.json("email@email.com");
    }
  });
});

/* post company  */
router.post("/add", (req, res) => {
  const company = new companyModel(req.body);
  company.save((err, data) => {
    if (!err) {
      // res.send(data);
      res.status(200).json({
        code: 200,
        message: "Company Added Successfully",
      });
    } else {
      console.log(err);
    }
  });
});

/* delete specific company */
router.delete("/company/:id", (req, res) => {
  companyModel.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      // res.send(data);
      res
        .status(200)
        .json({ code: 200, message: "Employee deleted", deleteCompany: data });
    } else {
      console.log(err);
    }
  });
});

/* update specific company */
router.put("/company/update/:id", (req, res) => {
  const company = req.body;
  companyModel.findByIdAndUpdate(
    req.params.id,
    { $set: company },
    { new: true },
    (err, data) => {
      if (!err) {
        res.status(200).json({
          code: 200,
          message: "Employee Updated Successfully",
        });
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
