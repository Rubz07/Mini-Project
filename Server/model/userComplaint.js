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
  main_complaint_type: { type: String, required: true },
  sub_complaint_type: { type: String, required: true },
  bank_name: { type: String, required: true },
  bank_branch: { type: String, required: true },
  bank_district: { type: String, required: true },
  officer: { type: mongoose.Schema.Types.ObjectId, ref: "officerModel" },
  address: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  userPincode: {
    type: Number,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  subcomment: {
    type: String,
  },
  status: {
    type: String,
    enum: [
      "Pending",
      "Reported",
      "Assigned",
      "Resolved",
      "Processing",
      "Rejected",
    ],
    default: "Pending",
  },
  priority: {
    type: String,
  },
  Reported: {
    type: Boolean,
    default: false,
  },
  ticket_raised: {
    type: Boolean,
    default: false,
  },
  ticket_raised_category: {
    type: String,
  },
  ticket_raised_reason: {
    type: String,
  },
  ticket_raised_date: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  actiondate: {
    type: Date,
  },
});
module.exports = mongoose.model("complaints", complaintSchema);
