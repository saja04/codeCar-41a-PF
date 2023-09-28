const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require("./src/Routes/index.routes.js");
const { conn } = require("./src/db.js");
const saveApiData = require("./saveApiData");

const server = express();
server.name = "server";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", router);

server.get("/", async (req, res) => {
  res.status(200).send("server running");
});

conn.sync({ force: true }).then(async () => {
  console.log("db connected");
  await saveApiData();
  server.listen(3001, () => {
    console.log("listening on port 3001");
  });
});

module.exports = server;
