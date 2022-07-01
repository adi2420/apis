const express = require("express");
const router = express.Router();
const Orders = require("../models/orders");

router.post("/:cid", (req, res) => {
  let cid = req.params.cid;
  let { pname, quantity, pricing, mrp } = req.body;
  if (pricing < mrp) {
    const newOrder = Orders.create({
      pname,
      quantity,
      pricing,
      mrp,
      cID: cid,
    });
    res.end();
  } else {
    res.send("Pricing should be less than MRP");
  }
});

module.exports = router;
