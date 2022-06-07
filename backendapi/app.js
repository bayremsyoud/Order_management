var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var companiesRouter = require("./routes/companies");
var usersRouter = require("./routes/users");
var ordersRouter = require("./routes/orders");
var authRouter = require("./routes/auth");
var invoicesRouter = require("./routes/invoices");
var mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost/gestion_project", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const app = express();
app.use("/pdfs", express.static(process.cwd() + "/pdfs"));
app.use("/public/images", express.static(process.cwd() + "/public/images"));

app.use(bodyparser.json());
app.use(cors());
app.use("/companies", companiesRouter);
app.use("/users/", usersRouter);
app.use("/orders", ordersRouter);
app.use("/auth", authRouter);
app.use("/invoices", invoicesRouter);

app.listen(PORT, (err, success) => {
  if (err) {
    console.log(err); //catch
  } else {
    console.log("server listen on port http://localhost:5000"); //then
  }
});
