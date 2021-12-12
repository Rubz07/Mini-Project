const accountSid = process.env.TWILIO_ACCOUNT_SID;
const bcrypt = require("bcryptjs");
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
        console.log(data.userid);
        let user = await userSchema.find({
          _id: data.userid,
        });
        let usermobile = `+${91}` + user[0].mobile;

        let regno = randomstring.generate({
          length: 6,
          charset: "numeric",
        });

        client.messages
          .create({
            body:
              "Your complaint is registered successfully and you register number is " +
              regno,
            from: "+19704382955",
            to: usermobile,
          })
          .then(async (message) => {
            if (message) {
              console.log(message.sid);
              var postcomplaint = new complaintSchema({
                registrationNo: regno,
                department: data.department,
                userId: data.userid,
                name: user[0].name,
                description: data.description,
                complaint_type: data.category,
                panchayat: data.panchayat,
                area: data.area,
              });
              var complaint = await postcomplaint.save();
              if (complaint) {
                console.log(complaint);
                resolve(complaint);
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
      try {
        await complaintSchema
          .find()
          .exec()
          .then((response) => {
            if (response) {
              resolve(response);
            }
            reject(response);
          })
          .catch((err) => console.log("error", err));
      } catch (error) {
        console.log(error.message);
      }
    });
  },

  getUserComplaint: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        await complaintSchema
          .find({ userId: id })
          .then((response) => {
            if (response) {
              console.log(response);
              resolve(response);
            }
          })
          .catch((err) => console.log("error", err));
      } catch (error) {
        console.log(error.message);
      }
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

  getStatusDetails: (regno) => {
    return new Promise(async (resolve, reject) => {
      await complaintSchema
        .findOne({ registrationNo: regno })
        .then((response) => {
          if (response) {
            console.log(response);
            resolve(response);
          }
        })
        .catch((err) => console.log("error", err));
    });
  },
  updatePassword: (data) => {
    console.log(data);
    return new Promise(async (resolve, reject) => {
      const salt = await bcrypt.genSalt(10);
      data.newpass = await bcrypt.hash(data.newpass, salt);
      await userSchema
        .updateOne({ _id: data.userid }, { $set: { password: data.newpass } })
        .then((response) => {
          if (response) {
            resolve(response);
          }
        })
        .catch((err) => console.log("error", err));
    });
  },
};
