const express = require("express");
const mongoose = require("mongoose");

const routes = require("./routes");

const app = express();

mongoose.connect("", { useNewUrlParser: true});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(4500);
