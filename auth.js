const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const usersDb = {};

const cache = {
  hashPassword: {},
  generateToken: {},
  validatePassword: {}
};

const hashPassword = async (password) => {
  if (cache.hashPassword[password]) {
    return cache.hashPassword[password];
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  cache.hashPassword[password] = hash;
  return hash;
};

const validatePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

const generateToken = (userId) => {
  if (cache.generateToken[userId]) {
    return cache.generateToken[userId];
  }
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  cache.generateToken[userId] = token;
  return token;
};

const registerUser = async (username, password) => {
  if (usersDb[username]) {
    throw new Error('User already exists');
  }
  const hashedPassword = await hashPassword(password);
  usersDb[username] = { password: hashedPassword };
  return { username, token: generateToken(username) };
};

const loginUser = async (username, password) => {
  if (!usersDb[username]) {
    throw new Error('User not found');
  }
  const isValid = await validatePassword(password, usersDb[username].password);
  if (!isValid) {
    throw new Error('Invalid password');
  }
  return { username, token: generateToken(username) };
};

const checkUserSession = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { valid: true, userId: decoded.userId };
  } catch (error) {
    return { valid: false };
  }
};

module.exports = { registerUser, loginUser, checkUserSession };