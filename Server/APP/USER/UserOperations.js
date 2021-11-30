const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
var randomstring = require("randomstring");
const client = require("twilio")(accountSid, authToken);
const dotenv = require("dotenv");
dotenv.config();

const userSchema = require("../../model/userModel");
const complaintSchema = require("../../model/userComplaint");
module.exports = {
  postComplaint: (data) => {
    try {
      return new Promise(async (resolve, reject) => {
        let regno = randomstring.generate({
          length: 6,
          charset: "numeric",
        });
        console.log(regno);
        client.messages
          .create({
            body:
              "Your complaint is registered successfully and you register number is " +
              regno,
            from: "+19704382955",
            to: "+919048317092",
          })
          .then(async (message) => {
            if (message) {
              console.log(message.sid);
              var postcomplaint = new complaintSchema({
                registrationNo: regno,
                name: data.name,
                description: data.description,
                complaint_category: data.category,
                panchayat: data.panchayat,
                area: data.area,
              });
              var complaint = await postcomplaint.save();
              if (complaint) {
                console.log(complaint);
                const response = {
                  register_status: true,
                  message: "complaint Registration successfull",
                };
                resolve(response);
              }
            } else {
              console.log("network issue");
            }
          });
      }).catch((err) => console.log("error", err));
    } catch (error) {
      console.log(error);
    }
  },

  getAllComplaints: () => {
    return new Promise(async (resolve, reject) => {
      await complaintSchema
        .find()
        .exec()
        .then((response) => {
          if (response) {
            // console.log(response);
            resolve(response);
          }
          reject(response);
        })
        .catch((err) => console.log("error", err));
    });
  },
  getAllUsers: () => {
    return new Promise(async (resolve, reject) => {
      await userSchema
        .find()
        .exec()
        .then((response) => {
          if (response) {
            console.log(response);
            resolve(response);
          }
          reject(response);
        })
        .catch((err) => console.log("error", err));
    });
  },
};
