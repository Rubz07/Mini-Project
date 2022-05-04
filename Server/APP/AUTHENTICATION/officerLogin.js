const officerSchema = require("../../model/OfficerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    //validation
    if (!req.body.officerId || !req.body.password)
      return res.status.json({
        status: false,
        message: "Validation Failed",
      });

    const officer = await officerSchema.findOne({
      userId: req.body.officerId,
    });

    if (!officer)
      return res.json({
        status: false,
        message: "User does not exist",
      });
    if (officer.status === "1") {
      if (req.body.password === officer.password) {
        const token = jwt.sign(
          {
            officerid: officer._id,
            name: officer.email,
            mobile: officer.mobile,
            department: officer.department,
            departmentId: officer.userId,
          },
          process.env.SECRET_CODE,
          { expiresIn: "1d" }
        );
        return res.status(200).json({
          status: true,
          verify: true,
          authToken: token,
        });
      } else {
        return res.json({
          status: false,
          message: "Password Incorrect",
        });
      }
    } else {
      return res.json({
        message: "User Denied",
      });
    }
  } catch (err) {
    return res.json({
      status: false,
      message: "Something went wrong",
      data: err,
    });
  }
};
