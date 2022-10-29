const Customers = require("./customers");
const Orders = require("./orders");
const mongoose = require("mongoose");
let shipments = mongoose.Schema({
  address: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  pincode: {
    type: Number,
    require: true,
  },
  oID: {
    ref: Orders,
    type: mongoose.Schema.Types.ObjectId,
  },
  cID: {
    ref: Customers,
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Shipments", shipments);
