const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = async (req, res, next) => {
  const token = req?.headers?.token;
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, user) => {
      if (error) {
        return res.status(500).send(error, "Invalid credentials");
      }
      next();
    });
  } catch (error) {
    res.send(error);
  }
};

module.exports = authenticateToken;
