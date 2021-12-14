const OfficerSchema = require("../../model/OfficerModel");

module.exports = {
  getOfficerComplaint: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        await OfficerSchema.find({ _id: id })
          .then((response) => {
            if (response) {
              //   complaints
              var officerComplaint = response.map((p) => {
                return p.complaints;
              });

              console.log(officerComplaint);
              resolve(officerComplaint);
            }
          })
          .catch((err) => console.log("error", err));
      } catch (error) {
        console.log(error.message);
      }
    });
  },
};
