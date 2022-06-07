const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
  statusInvoice: Boolean,
  companyInvoice : 
  {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  orderInvoice: 
  {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  dateInvoice: Date,
  costInvoice: Number,
  nomInvoice: String
});

const invoiceModel = mongoose.model("Invoice", InvoiceSchema);
module.exports = invoiceModel;
