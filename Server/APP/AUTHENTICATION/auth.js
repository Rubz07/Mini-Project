const userSchema = require("../../model/userModel");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  userRegistration: (data) => {
    try {
      return new Promise(async (resolve, reject) => {
        let response = {};
        const userExist = await userSchema.findOne({ mobile: data.mobile });
        if (userExist) {
          const response = {
            register_status: false,
            status_code: 403,
            message: "User Already exists",
          };

          resolve(response);
        } else {
          var user = new userSchema({
            name: data.name,
            email: data.email,
            address: data.address,
            pincode: data.pincode,
            mobile: data.mobile,
            password: data.password,
          });
          var userData = await user.save();
          if (userData) {
            const response = {
              register_status: true,
              message: "Registration successfull",
            };
            resolve(response);
          }
        }
      }).catch((err) => console.log("error", err));
    } catch (error) {
      console.log(error);
    }
  },
};
