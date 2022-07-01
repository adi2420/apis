const Customers = require("./customers");
const mongoose = require("mongoose");
let orders = mongoose.Schema({
  pname: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  pricing: {
    type: Number,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  cID: {
    ref: Customers,
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Orders", orders);
