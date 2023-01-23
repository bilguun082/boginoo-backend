const Users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.getUsers = async (req, res) => {
  const users = await Users.find();
  res.status(200).json({
    message: "success",
    data: users,
  });
};

exports.checkUser = async (req, res) => {
  const token = req?.headers?.token;
  if (!token) {
    return res.status(404);
  }
  const data = jwt.decode(token, process.env.ACCESS_TOKEN_KEY);
  res.status(200).json(data);
};

exports.createUsers = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(req.body.password, salt);
  try {
    const user = await Users.create({
      email: req.body.email,
      password: hashed,
    });
    res.send({ message: "created successfully", user });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email: email });
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(
        {
          email: user.email,
        },
        process.env.ACCESS_TOKEN_KEY,
        { expiresIn: "15m" }
      );
      res.send({ email: user.email, match: match, token: token });
    } else {
      res.send({ message: match });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
