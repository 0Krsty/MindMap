const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const usersDb = {};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const validatePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
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