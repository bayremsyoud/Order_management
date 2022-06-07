const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const PointSchema = new Schema({
  date: Date,
  time: Number,
  unit: String,
  user: String,
  userName: String,
  factured: Boolean,
});

const Point = mongoose.model("Point", PointSchema);
module.exports = Point;
