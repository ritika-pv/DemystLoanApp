const app = require("./app");
const env = require("dotenv");

const connectDatabase = require('./config/database');
//config
env.config({ path: "config/config.env" });


//connectingDb
connectDatabase();



const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on ${process.env.PORT}`);
});
