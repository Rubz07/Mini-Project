const OfficerSchema = require("../../model/OfficerModel");
const complaintSchema = require("../../model/userComplaint");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  getSubOfficerComplaint: (district) => {
    return new Promise(async (resolve, reject) => {
      try {
        await complaintSchema
          .find({ bank_district: district })
          .then((response) => {
            if (response) {
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
  complaintAction: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(data);
        let update;
        const action = {
          subcomment: data.sub_comment,
          status: data.action,
          actiondate: Date.now(),
        };
        await complaintSchema
          .find({ _id: data.complaint_id })
          .then((response) => {
            let Officermobile = `+${91}` + response[0].userContact;
            client.messages
              .create({
                body:
                  " Your complaint ID " +
                  response[0].registrationNo +
                  " is " +
                  data.action,
                from: "+19108389090",
                to: Officermobile,
              })
              .then(async (message) => {
                if (message.status === "queued") {
                  let res = await complaintSchema.findByIdAndUpdate(
                    data.complaint_id,
                    action,
                    {
                      new: true,
                      runValidators: true,
                      useFindAndModify: false,
                    }
                  );
                  if (res) {
                    update = "success";
                    resolve(update);
                  }
                }
              });
          });
      } catch (error) {
        console.log(error.message);
      }
    });
  },
  sendReport: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(data);
        let update;
        const action = {
          comment: data.sub_comment,
          priority: data.priority,
          Reported: true,
          status: "Reported",
          actiondate: Date.now(),
        };
        let res = await complaintSchema.findByIdAndUpdate(
          data.complaint_id,
          action,
          {
            new: true,
            runValidators: true,
            useFindAndModify: false,
          }
        );
        if (res) {
          update = "success";
          resolve(update);
        }
      } catch (error) {
        console.log(error.message);
      }
    });
  },
};
