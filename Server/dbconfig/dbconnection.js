const mongoose = require("mongoose");

const connect = function () {
  const url = process.env.MONGODB_UR;
  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };

  mongoose.connect(url, options).then(async (db, err) => {
    if (err) console.log("err connecting to db", err);
    console.log("connected to DB!!");
  });
};

module.exports.connect = connect;
