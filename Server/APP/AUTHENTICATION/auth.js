const userSchema = require("../../model/userModel");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = {
  userRegistration: (data) => {
    try {
      return new Promise(async (resolve, reject) => {
        let status;
        const userExist = await userSchema.findOne({ email: data.email });
        if (userExist) {
          status = "denied";

          resolve(status);
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

          if (userData) {
            status = "Approved";

            resolve(status);
          }
        }
      }).catch((err) => console.log("error", err));
    } catch (error) {
      console.log(error);
    }
  },
};
