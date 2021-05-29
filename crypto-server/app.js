const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const usersRouter = require('./routes/users');
// const exchangeRouter = require('./routes/exchange');
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter); 
// app.use('/api/exchange', exchangeRouter);

module.exports = app;
