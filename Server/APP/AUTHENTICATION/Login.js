const userSchema = require("../../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    //validation

    if (!req.body.mobile || !req.body.password)
      return res.status(400).json({
        status: false,
        message: "Validation Failed",
      });

    const user = await userSchema.findOne({
      mobile: req.body.mobile,
    });
    if (user.status === "1") {
      if (!user)
        return res.status(404).json({
          status: false,
          message: "User does not exist",
        });

      const pwdMatch = await bcrypt.compare(req.body.password, user.password);

      if (!pwdMatch)
        return res.status(401).json({
          status: false,
          message: "Password Incorrect",
        });
      const token = jwt.sign(
        {
          userid: user._id,
          email: user.email,
          username: user.name,
          mobileno: user.mobile,
        },
        process.env.SECRET_CODE,
        { expiresIn: "1d" }
      );
      return res.status(200).json({
        message: "success",
        authToken: token,
        role: user.role,
      });
    } else {
      return res.status(500).send({
        message: "User Denied",
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      data: err,
    });
  }
};
