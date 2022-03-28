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
  userContact: {
    type: Number,
    required: true,
    unique: true,
  },
  department: { type: String, ref: "departments" },
  complaint_type: { type: String, required: true },
  officer: { type: mongoose.Schema.Types.ObjectId, ref: "officerModel" },
  area: {
    type: String,
    required: true,
  },
  panchayat: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Assigned", "Resolved","Processing","Rejected"],
    default: "Pending",
  },
  priority: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("complaints", complaintSchema);
