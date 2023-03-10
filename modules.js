require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

// Set up JWT secret for token generation and verification
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'mysecret';

// Create Mongoose Schema
const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = require('./models/user');
const Restaurant = require('./models/restaurant');
const WishList = require('./models/wishlist');
const Rating = require('./models/rating');

module.exports = {
  express,
  bodyParser,
  mongoose,
  Schema,
  path,
  nodemailer,
  crypto,
  jwt,
  JWT_SECRET,
  User,
  Restaurant,
  WishList,
  Rating,
  bcrypt
};
