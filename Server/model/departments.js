const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  departmentname: {
    type: String,
    lowercase: true,
    sparse: true,
    required: true,
  },
  registrationNo: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["0", "1"],
    default: "1",
  },
});
module.exports = mongoose.model("departments", departmentSchema);
