const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
require("dotenv").config()

// get mongo db url and db name from env
const dbUrl = process.env.DB_URL
const dbName = process.env.DB_NAME
mongoose
  .connect(`${dbUrl}/${dbName}`, { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(bodyParser.json());

    app.use("/api", routes);

    app.listen(8080, () => {
      console.log("Server listening at 8080");
    });
  });
