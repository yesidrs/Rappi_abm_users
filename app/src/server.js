"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { engine } = require("express-handlebars");

const app = express();

let corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', engine({
  extname: 'hbs'
}))
app.set('view engine', 'hbs');
app.set("views", __dirname + '/views');


const db = require("./models");
db.sequelize.sync();

require("./routes/users.routes.js")(app);

const DOCKER_PORT = process.env.NODE_DOCKER_PORT || 3000;
app.listen(DOCKER_PORT, () =>
  console.log(
    `Server running on port ${DOCKER_PORT}`
  )
);
