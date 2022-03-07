const OfficerSchema = require("../../model/OfficerModel");
const complaintSchema = require("../../model/userComplaint");
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
          .find({ department: department })
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
          userId: data.mobile,
        });
        if (OfficerExist) {
          status = "denied";
          // resolve(status);
        } else {
          console.log(Officermobile);
          client.messages
            .create({
              body:
                " Your credentials for CM-Portal is USERNAME " +
                data.department_id +
                " and PASSWORD " +
                password,
              from: "+19108389090",
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
};
