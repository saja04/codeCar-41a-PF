
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require("./src/Routes/index.routes.js");
const { conn } = require("./src/db.js");
const saveApiData = require("./saveApiData");
require("dotenv").config();
const { auth } = require('express-oauth2-jwt-bearer');
const saveUserData = require('./saveUserData.js')

const server = express();
server.name = "server";


server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));


server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Esto permite solicitudes desde cualquier origen
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization" // Agrega "Authorization" aquí
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});




// server.use(jwtCheck);


server.use("/", router);



conn.sync({ force: true }).then(async () => {
  console.log("db connected");
  await saveApiData();
  await saveUserData();
  server.listen(3001, () => {
    console.log("listening on port 3001");
  });
});

module.exports = server;
