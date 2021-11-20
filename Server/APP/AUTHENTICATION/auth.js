const userSchema = require("../../model/userModel");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  userRegistration: (data) => {
    try {
      return new Promise(async (resolve, reject) => {
        let response = {};
        const userExist = await userSchema.findOne({ email: data.email });
        if (userExist) {
          const response = {
            register_status: false,
            status_code: 403,
            message: "User Already exists",
          };
          reject(response);
        } else {
          var user = new userSchema({
            name: data.name,
            email: data.email,
            district: data.district,
            address: data.address,
            pincode: data.pincode,
            mobile: data.mobile,
            adhaar: data.adhaar,
            password: data.password,
          });
          var userData = await user.save();
          console.log(userData);
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
