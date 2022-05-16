const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ticketHandlerSchema = new mongoose.Schema({
  ticket_raised_cmp_bank_name: {
    type: String,
  },
  ticket_category: {
    type: String,
  },
  ticket_reason: {
    type: String,
  },
  complaint_id: {
    type: Schema.Types.ObjectId,
    ref: "complaints",
  },
  officer_id: {
    type: Schema.Types.ObjectId,
    ref: "officerModel",
  },
  complaint_regNo: {
    type: String,
  },
  clarification_remark: {
    type: String,
  },
  explanation: {
    type: String,
  },
  explanation_send_date: {
    type: Date,
  },
   ticket_raised_date: {
    type: Date,
  },
  clarification_ask_date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("ticketData", ticketHandlerSchema);
