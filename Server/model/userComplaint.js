const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  registrationNo: {
    type: String,
    required: true,
    unique: true,
  },
  name: { type: String, lowercase: true, sparse: true, required: true },
  description: {
    type: String,
    required: true,
  },
  category: { type: String, ref: "categoryModel" },
  complaint_category: { type: String, required: true },
  officer: { type: String, ref: "officerModel" },
  area: {
    type: String,
    required: true,
  },
  panchayat: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Resolved"],
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("complaints", complaintSchema);
