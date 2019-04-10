const express = require("express");
const mongoose = require("mongoose");
const appConfig = require("./config/app");
const routes = require("./routes");

const app = express();

mongoose.connect(appConfig.MONGO_URL, { useNewUrlParser: true }, err => {
  if (err) console.log("DB error: ", err);

  console.log("connected to mongo db.");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(4500);
