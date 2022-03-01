const OfficerSchema = require("../../model/OfficerModel");
const complaintSchema = require("../../model/userComplaint");
module.exports = {
  getOfficerComplaint: (department) => {
    return new Promise(async (resolve, reject) => {
      try {
        await complaintSchema
          .find({ department: department })
          .then((response) => {
            if (response) {
              //   complaints
              var officerComplaint = response.map((p) => {
                return p;
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
