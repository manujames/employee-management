const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/EmpData", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  name: String,
  designation: String,
  email: String,
  phone: String,
  address: String,
});
const EmployeeData = mongoose.model("employee", EmployeeSchema);

module.exports.EmployeeData = EmployeeData;
