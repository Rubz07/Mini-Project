const mongoose = require("mongoose");

const bankDataSchema = new mongoose.Schema({
  bank_name: {
    type: String,

    sparse: true,
  },
  status: {
    type: String,
    enum: ["0", "1"],
    default: "1",
  },
});
module.exports = mongoose.model("bankdata", bankDataSchema);
