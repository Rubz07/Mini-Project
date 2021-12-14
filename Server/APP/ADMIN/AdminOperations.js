const userSchema = require("../../model/userModel");
const departmentSchema = require("../../model/departments");
const officerSchema = require("../../model/OfficerModel");
const complaintSchema = require("../../model/userComplaint");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const dotenv = require("dotenv");
dotenv.config();

var generator = require("generate-password");
var randomstring = require("randomstring");
module.exports = {
  getAllUsers: () => {
    return new Promise(async (resolve, reject) => {
      await userSchema
        .find()
        .exec()
        .then((response) => {
          if (response) {
            resolve(response);
          }
          reject(response);
        })
        .catch((err) => console.log("error", err));
    });
  },

  createDepartment: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let regno = randomstring.generate({
          length: 6,
          charset: "numeric",
        });
        var department = new departmentSchema({
          departmentname: data.name,
          registrationNo: regno,
        });
        var departmentData = await department.save();
        if (departmentData) {
          resolve(departmentData);
        }
      } catch (error) {
        console.log((err) => err.message);
      }
    });
  },

  updateDepartment: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        await departmentSchema
          .updateOne(
            { _id: data.id },
            { $set: { departmentname: data.newdep } }
          )
          .then((response) => {
            if (response) resolve(response);
          });
      } catch (error) {
        console.log((err) => err.message);
      }
    });
  },

  getAlldepartments: () => {
    return new Promise(async (resolve, reject) => {
      await departmentSchema
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

  removeDepartment: (proid) => {
    return new Promise(async (resolve, reject) => {
      await departmentSchema
        .updateOne({ _id: proid }, { $set: { status: "0" } })
        .then((response) => {
          if (response) {
            console.log(response);
            resolve(response);
          }
        })
        .catch((err) => console.log("error", err));
    });
  },

  blockUser: (proid) => {
    console.log(proid);
    return new Promise(async (resolve, reject) => {
      await userSchema
        .updateOne({ _id: proid }, { $set: { status: "0" } })
        .then((response) => {
          if (response) {
            console.log(response);
            resolve(response);
          }
        })
        .catch((err) => console.log("error", err));
    });
  },

  deleteUser: (proid) => {
    console.log("id", proid);
    return new Promise(async (resolve, reject) => {
      await userSchema
        .deleteOne({ _id: proid })
        .then((response) => {
          if (response) {
            console.log(response);
            resolve(response);
          }
        })
        .catch((err) => console.log("error", err));
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
        const OfficerExist = await officerSchema.findOne({
          userId: data.department_id,
        });
        if (OfficerExist) {
          status = "denied";
          resolve(status);
        } else {
          const department = await departmentSchema.findOne({
            registrationNo: data.department_id,
          });
          console.log(Officermobile);
          client.messages
            .create({
              body:
                " Your credentials for CM-Portal is USERNAME " +
                data.department_id +
                " and PASSWORD " +
                password,
              from: "+19704382955",
              to: "+919048317092",
            })
            .then(async (message, err) => {
              if (err) {
                console.log(err);
              }
              if (message) {
                var officer = new officerSchema({
                  name: data.name,
                  mobile: data.mobile,
                  department: department.departmentname,
                  userId: data.department_id,
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

  getAllComplaints: () => {
    return new Promise(async (resolve, reject) => {
      try {
        await complaintSchema
          .find({ status: "Pending" })
          .exec()
          .then((response) => {
            if (response) {
              resolve(response);
            }
          })
          .catch((err) => console.log("error", err));
      } catch (error) {
        console.log(error.message);
      }
    });
  },

  assignComplaint: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let status;
        console.log(data.complaint_department);
        const OfficerExist = await officerSchema.findOne({
          userId: data.complaint_department,
        });
        if (OfficerExist) {
          await officerSchema
            .updateOne(
              { _id: OfficerExist._id },
              { $push: { complaints: data } }
            )
            .then(async () => {
              console.log(data.complaint_id);
              await complaintSchema.updateOne(
                { _id: data.complaint_id },
                { $set: { status: "Assigned", officer: OfficerExist._id } }
              );
            })
            .then(() => {
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

  getAllOfficers: () => {
    return new Promise(async (resolve, reject) => {
      await officerSchema
        .find()
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
};
