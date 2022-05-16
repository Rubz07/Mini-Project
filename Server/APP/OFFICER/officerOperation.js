const OfficerSchema = require("../../model/OfficerModel");
const complaintSchema = require("../../model/userComplaint");
const complaintDataSchema = require("../../model/complaintData");
const TicketSchema = require("../../model/TicketHandlerModel");
const bankDataSchema = require("../../model/BankData");
const officerSchema = require("../../model/OfficerModel");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const dotenv = require("dotenv");
dotenv.config();

var generator = require("generate-password");

module.exports = {
  getOfficerComplaint: (department) => {
    return new Promise(async (resolve, reject) => {
      try {
        await complaintSchema
          .find({ department: department } && { Reported: true })
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

  getTicketRaisedComplaints: (department) => {
    return new Promise(async (resolve, reject) => {
      try {
        await complaintSchema
          .find({ department: department } && { ticket_raised: true })
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

  getOfficerDetails: (department) => {
    return new Promise(async (resolve, reject) => {
      try {
        await OfficerSchema.find({ department: department })
          .then((response) => {
            console.log(response);
            if (response) {
              var officerDetails = response.map((p) => {
                return p;
              });
              resolve(officerDetails);
            }
          })
          .catch((err) => console.log("error", err));
      } catch (error) {
        console.log(error.message);
      }
    });
  },

  createOfficer: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        var password = generator.generate({
          length: 6,
          numbers: true,
        });
        let Officermobile = `+${91}` + data.mobile;
        let status;
        const OfficerExist = await OfficerSchema.findOne({
          district: data.distrct,
        });
        if (OfficerExist) {
          status = "denied";
          resolve(status);
        } else {
          client.messages
            .create({
              body:
                " Your credentials for CM-Portal is USERNAME " +
                data.department_id +
                " and PASSWORD " +
                password,
              from: "+19794014869",
              to: "+919048317092",
            })
            .then(async (message, err) => {
              if (err) {
                console.log(err);
              }
              if (message) {
                var officer = new OfficerSchema({
                  name: data.name,
                  mobile: data.mobile,
                  department: data.departmentName,
                  userId: data.departmentId,
                  district: data.distrct,
                  password: password,
                });
                var officerData = await officer.save();
                if (officerData) {
                  status = "Approved";
                  resolve(status);
                }
              }
            });
        }
      } catch (error) {
        console.log((err) => err.message);
      }
    });
  },
  assignSubOfficer: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let status;
        const complaintDetails = await complaintSchema.findOne({
          registrationNo: data.complaintRegistrationID,
        });

        if (complaintDetails) {
          complaintDetails.updateOne(data).then(async () => {
            let status = "success";
            resolve(status);
          });
        } else {
          let status = "failed";
          resolve(status);
        }
      } catch (error) {
        console.log((err) => err.message);
      }
    });
  },

  manageOfficers: () => {
    return new Promise(async (resolve, reject) => {
      await officerSchema
        .find({ role: "sub" })
        .exec()
        .then((response) => {
          if (response) {
            resolve(response);
          } else {
            console.log("some error occured");
          }
        })
        .catch((err) => console.log("error", err));
    });
  },

  blockOfficer: (id) => {
    return new Promise(async (resolve, reject) => {
      const action = {
        status: "0",
      };
      await officerSchema
        .findByIdAndUpdate(id.officer_id, action, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        })
        .then((response) => {
          if (response) {
            resolve(response);
          } else {
            console.log("some error occured");
          }
        })
        .catch((err) => console.log("error", err));
    });
  },

  unBlockOfficer: (id) => {
    return new Promise(async (resolve, reject) => {
      const action = {
        status: "1",
      };
      await officerSchema
        .findByIdAndUpdate(id.officer_id, action, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        })
        .then((response) => {
          if (response) {
            resolve(response);
          } else {
            console.log("some error occured");
          }
        })
        .catch((err) => console.log("error", err));
    });
  },

  createComplaintData: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let status;

        const cmp = await complaintDataSchema.findOne({
          main_complaint: data.main_complaint,
        });
        if (cmp) {
          status = "false";
          resolve(status);
        } else {
          var cmpData = new complaintDataSchema({
            main_complaint: data.main_complaint,
            sub_complaint: data.sub_complaint,
          });
          var departmentData = await cmpData.save();
          if (departmentData) {
            status = "success";
            resolve(status);
          }
        }
      } catch (error) {
        console.log((err) => err.message);
      }
    });
  },
  getAllComplaintDatas: () => {
    return new Promise(async (resolve, reject) => {
      await complaintDataSchema
        .find({ status: "1" })
        .exec()
        .then((response) => {
          if (response) {
            resolve(response);
          }
        })
        .catch((err) => console.log("error", err));
    });
  },
  getAllBankDatas: () => {
    return new Promise(async (resolve, reject) => {
      await bankDataSchema
        .find({ status: "1" })
        .exec()
        .then((response) => {
          if (response) {
            resolve(response);
          }
        })
        .catch((err) => console.log("error", err));
    });
  },

  createBankData: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let status;

        const bank = await bankDataSchema.findOne({
          bank_name: data.bank_name,
        });
        if (bank) {
          status = "false";
          resolve(status);
        } else {
          var bankData = new bankDataSchema({
            bank_name: data.bank_name,
          });
          var bnkData = await bankData.save();
          if (bnkData) {
            status = "success";
            resolve(status);
          }
        }
      } catch (error) {
        console.log((err) => err.message);
      }
    });
  },

  askClarification: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let update;

        await OfficerSchema.find({
          district: data.bankDistrict,
        }).then((response) => {
          let officerMobile = `+${91}` + response[0].mobile;
          client.messages
            .create({
              body:
                " Explanation seeked for the complaint Id  " +
                data.complaint_regNo +
                " Needs more Clarification. Clarification Type - " +
                data.ticketCategory,
              from: "+19794014869",
              to: "+919048317092",
            })
            .then(async (message) => {
              console.log(message);
              if (message.status === "queued") {
                var ticketData = new TicketSchema({
                  complaint_id: data.complaint_id,
                  complaint_regNo: data.complaint_regNo,
                  ticket_category: data.ticketCategory,
                  ticket_reason: data.ticketRaisedReason,
                  ticket_raised_cmp_bank_name: data.bankDistrict,
                  ticket_raised_date: data.ticketRaisedDate,
                  clarification_remark: data.officerRemark,
                  officer_id: response[0]._id,
                });
                var ticketDetails = await ticketData.save();
                if (ticketDetails) {
       
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
};
