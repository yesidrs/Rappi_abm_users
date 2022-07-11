"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

let corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");

db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Rappi ABM." });
});

require("./routes/users.routes.js")(app);

const DOCKER_PORT = process.env.NODE_DOCKER_PORT || 3000;
app.listen(DOCKER_PORT, () =>
  console.log(
    `Server running on port ${DOCKER_PORT}`
  )
);
