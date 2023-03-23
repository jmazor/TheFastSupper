require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const { createToken, isExpired, returnUser, refresh } = require('./manageJWT');


// Create Mongoose Schema
const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = require('./models/user');
const Restaurant = require('./models/restaurant');
const History = require('./models/history');
const Review = require('./models/review');

module.exports = {
  express,
  bodyParser,
  mongoose,
  Schema,
  path,
  nodemailer,
  crypto,
  User,
  Restaurant,
  History,
  Review,
  bcrypt,
  createToken,
  isExpired,
  returnUser,
  refresh
};
