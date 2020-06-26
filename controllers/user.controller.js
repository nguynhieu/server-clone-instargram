const jwt = require('jsonwebtoken')

const User = require('../models/user.model');

module.exports.index = async (req, res) => {
  const users = await User.find();
  res.json(users);
}

module.exports.signup = async (req, res) => {
  await User.insertMany(req.body)
  const users = await User.find();
  res.json(users);
}

module.exports.login = async (req, res) => {
  const { account, password } = req.body;

  const user = await User.findOne({
    username: account
  }).lean()

  if (!user) {
    return res.sendStatus(401)
  }

  if (user.password !== password) {
    return res.sendStatus(401)
  }

  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFE_SECRET
  })

  res.json({ token, user });
}