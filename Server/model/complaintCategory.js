const mongoose = require("mongoose");

const complaintCategory = new mongoose.Schema({
  name: { type: String, lowercase: true, sparse: true, required: true },
  categoryimage: {
    type: String,
    required: true,
  },
  status: { type: Boolean, default: true, required: true },
});
module.exports = mongoose.model("categoryModel", complaintCategory);
