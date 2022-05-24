const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const dotenv = require("dotenv");
dotenv.config();

const client = require("twilio")(accountSid, authToken);

module.exports = {
  otpAuthentication: (mobno) => {
    return new Promise(async (resolve, reject) => {
      try {
        let register_status = false;

        const mobilenumber = `+${91}` + mobno;
        console.log(mobilenumber);
        // if (isNaN(mobno) || mobno.length !== 10) {
        //   register_status = false;
        //   resolve({ register_status });
        // } else {
        client.verify
          .services(process.env.service_id)
          .verifications.create({
            to: mobilenumber,
            channel: "sms",
          })
          .then((status) => {
            if (status) {
              register_status = true;
              resolve(register_status);
            }
          })
          .catch((err) => console.log("error", err));
        // }
      } catch (error) {
        console.log(error.message);
      }
    });
  },
  otpVerification: (otpcode, mobileNO) => {
    try {
      return new Promise(async (resolve, reject) => {
        let register_status = false;
        const mobilenumber = `+${91}` + mobileNO;
        client.verify
          .services(process.env.service_id)
          .verificationChecks.create({
            to: mobilenumber,
            code: otpcode,
          })
          .then((response) => {
            console.log(response);
            resolve(response.status);
          })
          .catch((err) => console.log(err));
      });
    } catch (error) {
      console.log("some error occured");
    }
  },
};
