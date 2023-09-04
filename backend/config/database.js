const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`MongoDb Connected and the  Host is ${data.connection.host}`);
    })
    .catch((err) => console.log(`No Connection ${err}`));
};
module.exports = connectDatabase;
