const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  name: { type: String, lowercase: true, sparse: true, required: true },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },

  area: {
    type: String,
    required: true,
  },
  panchayat: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("complaints", complaintSchema);
