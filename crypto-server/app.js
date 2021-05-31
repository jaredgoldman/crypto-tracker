require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

const usersRouter = require('./routes/users');
const exchangeRouter = require('./routes/coins');
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter); 
app.use('/api/coins', coinRouter);

module.exports = app;
