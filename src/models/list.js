const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ListSchema = new Schema({
  original: { type: String },
  short: { type: String },
  user: { type: String },
});

const Lists = mongoose.model("urls", ListSchema);

module.exports = Lists;
