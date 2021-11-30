const userSchema=require("../../model/userModel")
module.exports = {
    getAllUsers: () => {
        return new Promise(async (resolve, reject) => {
          await userSchema
            .find()
            .exec()
            .then((response) => {
              if (response) {
                console.log(response);
                resolve(response);
              }
              reject(response);
            })
            .catch((err) => console.log("error", err));
        });
      },
}
