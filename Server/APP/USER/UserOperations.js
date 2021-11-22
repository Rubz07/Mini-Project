const complaintSchema = require("../../model/userComplaint");
module.exports = {
  postComplaint: (data) => {
    console.log(data);
    try {
      return new Promise(async (resolve, reject) => {
        var postcomplaint = new complaintSchema({
          name: data.name,
          description: data.description,
          category: data.category,
          panchayat: data.panchayat,
          area: data.area,
        });
        var complaint = await postcomplaint.save();
        console.log(complaint);
        if (complaint) {
          const response = {
            register_status: true,
            message: "complaint Registration successfull",
          };
          resolve(response);
        }
      }).catch((err) => console.log("error", err));
    } catch (error) {
      console.log(error);
    }
  },

  getAllComplaints: () => {
    return new Promise(async (resolve, reject) => {
      await complaintSchema
        .find()
        .exec()
        .then((response) => {
          if (response) {
            console.log(response);
            resolve(response);
          }
        })
        .catch((err) => console.log("error", err));
    });
  },
};
