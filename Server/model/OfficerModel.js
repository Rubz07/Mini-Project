const mongoose = require("mongoose");

const officerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: Number },
  categoryimage: {
    type: String,
  },
  department: {
    type: String,
    required: true,
  },
  complaints: { type: Array },
  status: { type: Boolean, default: true, required: true },
});
module.exports = mongoose.model("officerModel", officerSchema);
