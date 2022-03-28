const OfficerSchema = require("../../model/OfficerModel");
const complaintSchema = require("../../model/userComplaint");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  getSubOfficerComplaint: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        await complaintSchema
          .find({ officer: id })
          .then((response) => {
            if (response) {
              //   complaints
              var officerComplaint = response.map((p) => {
                return p;
              });
              resolve(officerComplaint);
            }
          })
          .catch((err) => console.log("error", err));
      } catch (error) {
        console.log(error.message);
      }
    });
  },
};
