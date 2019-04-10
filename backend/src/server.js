const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const appConfig = require('./config/app');
const routes = require('./routes');

const app = express();
app.use(cors());

const httpServer = require("http").Server(app);
const io = require("socket.io")(httpServer);

const PORT = process.env.PORT || 4500;

io.on("connection", socket => {
  socket.on("connectionRoom", box => {
    socket.join(box);
  });
});

mongoose.connect(appConfig.MONGO_URL, { useNewUrlParser: true }, err => {
  if (err) console.log("DB error: ", err);

  console.log("connected to mongo db.");
});

app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));
app.use(routes);

httpServer.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
