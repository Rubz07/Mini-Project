const mongoose = require("mongoose");

const complaintDataSchema = new mongoose.Schema({
  main_complaint: {
    type: String,
  
    sparse: true,
  },
  sub_complaint: {
    type: String,
  },
  status: {
    type: String,
    enum: ["0", "1"],
    default: "1",
  },
});
module.exports = mongoose.model("complaintdata", complaintDataSchema);
