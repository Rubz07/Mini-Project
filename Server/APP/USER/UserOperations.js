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
            from: "+19794014869",
            to: usermobile,
          })
          .then(async (message) => {
            if (message) {
              console.log(message.sid);
              var postcomplaint = new complaintSchema({
                registrationNo: regno,
                userId: data.userid,
                main_complaint_type: data.mainCategory,
                sub_complaint_type: data.subCategory,
                bank_name: data.bankName,
                bank_branch: data.bankBranch,
                bank_district: data.bankDistrict,
                description: data.description,
                department: data.department,
                name: user[0].name,
                userContact: user[0].mobile,
                district: user[0].district,
                address: user[0].address,
                userPincode: user[0].pincode,
                userEmail: user[0].email,
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
      var status = await complaintSchema
        .findOne({ registrationNo: regno })
        .populate("officer", "name mobile")
        .exec((err, posts) => {
          if (posts) {
            resolve(posts);
          }
        });
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

  ticketAction: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let update;
        const action = {
          ticket_raised: true,
          ticket_raised_category: data.ticketCategory,
          ticket_raised_reason: data.ticketRaisedReason,
          ticket_raised_date: Date.now(),
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
