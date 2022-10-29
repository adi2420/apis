const express = require("express");
const router = express.Router();
const Shipments = require("../models/shipments");
const Orders = require("../models/orders");

router.post("/:oid", (req, res) => {
  let oid = req.params.oid;
  Orders.findOne({ _id: oid }, (err, order) => {
    if (err) {
      console.log("No order found");
    } else {
      let { address, city, pincode } = req.body;
      const newShip = Shipments.create({
        address,
        city,
        pincode,
        oID: oid,
        cID: order.cID,
      });
    }
  });
  res.end();
});

module.exports = router;
