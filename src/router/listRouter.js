const express = require("express");
const {
  getLists,
  createList,
  getLink,
  getUserLink,
  getHistory,
} = require("../controller/listController");
const authenticateToken = require("../middleware/authorization");

const listRouter = express.Router();

listRouter.get("/", getLists);
listRouter.post("/create", createList);
listRouter.get("/user/:id", getUserLink);
listRouter.get("/:id", getLink);
listRouter.get("/:page/:limit", getHistory);

module.exports = listRouter;
