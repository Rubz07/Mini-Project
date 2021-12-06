const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const complaintSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
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
  department: { type: String, ref: "departments" },
  complaint_type: { type: String, required: true },
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
    enum: ["Pending", "Approved", "Assigned", "Resolved"],
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("complaints", complaintSchema);
