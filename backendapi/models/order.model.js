const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const OrderSchema = new Schema({
  nameOrder: String,
  companyOrder: 
    {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  qteOrder: Number,
  prixOrder: Number,
  dateDebutOrder: Date,
  dateFinOrder: Date,
  statusOrder: Boolean,
  descOrder: String,
  employeeOrder: [{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }],
  costOrder: Number,
  isFactured : Boolean
  
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
