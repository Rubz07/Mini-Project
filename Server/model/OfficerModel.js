const mongoose = require("mongoose");

const officerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: Number },
  userId: {
    type: String,
  },
  password: {
    type: String,
  },
  department: {
    type: Number,
    required: true,
  },
  complaints: { type: Array },
  status: {
    type: String,
    enum: ["0", "1"],
    default: "1",
  },
});
module.exports = mongoose.model("officerModel", officerSchema);
