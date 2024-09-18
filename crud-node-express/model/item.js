const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: String,
    required: true,
  },
});

const item = mongoose.model("Item", schema);

module.exports = item;
