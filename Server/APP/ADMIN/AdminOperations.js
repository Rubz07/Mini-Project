const userSchema = require("../../model/userModel");
const departmentSchema = require("../../model/departments");
var randomstring = require("randomstring");
module.exports = {
  getAllUsers: () => {
    return new Promise(async (resolve, reject) => {
      await userSchema
        .find({ status: "1" })
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

  getAlldepartments: () => {
    return new Promise(async (resolve, reject) => {
      await departmentSchema
        .find({ status: "1" })
        .exec()
        .then((response) => {
          if (response) {
            console.log(response);
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

  removeUser: (proid) => {
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
};
