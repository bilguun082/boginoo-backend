const { response } = require("express");
const Lists = require("../models/list");

exports.getLists = async (req, res) => {
  const lists = await Lists.find();
  res.send(lists);
};

exports.createList = async (req, res) => {
  try {
    const list = req.body;
    const listData = await Lists.create(list);
    res.send(listData);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.getLink = async (req, res) => {
  try {
    const id = req.params.id;
    const listData = await Lists.find({ short: id });
    res.send(listData[0]);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getUserLink = async (req, res) => {
  const { id } = req.params;
  try {
    const listData = await Lists.find({ user: id });
    res.status(200).json({
      message: "success",
      data: listData,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getHistory = async (req, res) => {
  const page = Number(req.params.page);
  const limit = Number(req.params.limit);

  try {
    const posts = await Lists.find()
      .limit(limit)
      .skip(limit * (page - 1))
      .exec();

    res.status(200).json({ message: "success", posts });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
