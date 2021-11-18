const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const dotenv = require("dotenv");
dotenv.config();

const client = require("twilio")(accountSid, authToken);

module.exports = {
  otpAuthentication: (mobno) => {
    return new Promise(async (resolve, reject) => {
      let register_status = false;
      let response = {};
      const mobilenumber = `+${91}` + mobno;
      if (isNaN(mobno) || mobno.length != 10) {
        register_status = false;
        resolve({ register_status });
      } else {
        client.verify
          .services(process.env.service_id)
          .verifications.create({
            to: mobilenumber,
            channel: "sms",
          })
          .then((status) => {
            console.log(status);
            if (status) {
              response.register_status = true;
              resolve(response);
            }
          })
          .catch((err) => console.log("error", err));
      }
    });
  },
  otpVerification: (otpcode, mobileNO) => {
    try {
      return new Promise(async (resolve, reject) => {
        const mobilenumber = `+${91}` + mobileNO;
        client.verify
          .services(process.env.service_id)
          .verificationChecks.create({
            to: mobilenumber,
            code: otpcode,
          })
          .then(async (response) => {
            if (response.status == "approved") {
              response.register_status = true;
              resolve(response);
            } else {
              response.register_status = false;
              resolve(response);
            }
          })
          .catch((err) => console.log("error", err));
      });
    } catch (error) {
      console.log("some error occured");
    }
  },
};
