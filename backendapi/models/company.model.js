const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const CompanySchema = new Schema({
  nomCompany: String,
  companyRep:String,
  emailCompany: String,
  numCompany: String,
  addressCompany: String,
  added_at: Date,
});

const Company = mongoose.model("Company",CompanySchema);
module.exports = Company;
