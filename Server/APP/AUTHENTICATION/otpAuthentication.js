const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

module.exports = {
  otpAuthentication: (mobno,) => {
    return new Promise(async (resolve, reject) => {
      let register_status = false;
      let response = {};
      const mobilenumber = `+${91}` + mobno;
      if (isNaN(mobno) || mobno.length != 10) {
        console.log("hello00000");
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
            if (status) {
              response.register_status = true;
              resolve(response);
            }
          })
          .catch((err) => console.log("error", err));
      }
    });
  },
};
