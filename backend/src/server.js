const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const appConfig = require("./config/app");
const routes = require("./routes");

const app = express();

mongoose.connect(appConfig.MONGO_URL, { useNewUrlParser: true }, err => {
  if (err) console.log("DB error: ", err);

  console.log("connected to mongo db.");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/files", express.static(path.resolve(__dirname, '..', 'tmp')));
app.use(routes);

app.listen(4500);
