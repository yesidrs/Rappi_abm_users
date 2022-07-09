'use strict';

require('dotenv').config();
const express = require('express');
//const cors = require('cors')
const morgan = require('morgan');

const app = express();

/*let corsOptions = {
  origin: "http://localhost:8081"
};*/

require('./config/db.connection.js');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//require('./routes/users.route');
//app.use('/api', routes);

const PORT = process.env.NODE_DOCKER_PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
