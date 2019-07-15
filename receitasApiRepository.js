require('dotenv-safe').load()
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGODB_URI;

function connect () {
  console.log(process.env.MONGODB_URI)
  mongoose.connect(MONGO_URL,
    { useNewUrlParser: true },
    function (error) {
      if(error) {
        console.error("Algo de errado não está certo: ", error)
      } else {
        console.log("Conectado no mongoDB.")
      }
    }
  );
}

module.exports = { connect }