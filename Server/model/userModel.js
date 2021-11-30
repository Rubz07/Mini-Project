var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  adhaar: {
    type: Number,
  },
  district: {
    type: String,
  },
  address: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  password: {
    type: String,
  },
  status: { type: Boolean, default: true, required: true },
});

userSchema.pre("save", function (next) {
  var user = this;
  var SALT_FACTOR = 10; // 12 or more for better security

  if (!user.isModified("password")) return next();

  console.log(user.password); // Check accident password update

  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      console.log(user.password);
      next();
    });
  });
});
module.exports = mongoose.model("users", userSchema);
