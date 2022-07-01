const express = require("express");
const router = express.Router();
const Shipments = require("../models/shipments");
const Customers = require("../models/customers");
const Orders = require("../models/orders");

router.get("/details", async (req, res) => {
  let final = [];
  let custs = await Customers.find({});
  for (var cust in custs) {
    let details = {};
    details["Customer Details"] = custs[cust];
    // customs.push(custs[cust]);
    let order = await Orders.find({ cID: custs[cust]._id });
    let orders = [];
    for (ord in order) {
      orders.push(order[ord]);
    }
    details["Purchase Order"] = orders;
    final.push(details);
  }
  res.send(final);
});

router.get("/allDetails", async (req, res) => {
  let final = [];
  let custs = await Customers.find({}, { __v: 0 });
  for (var cust in custs) {
    let details = {};
    details["Customer Details"] = custs[cust];
    let order = await Orders.find({ cID: custs[cust]._id }, { cID: 0 });
    let orders = [];
    let ships = [];
    for (ord in order) {
      let ship = await Shipments.find({ oID: order[ord]._id }, { cID: 0 });
      ships.push(ship);
      orders.push(order[ord]);
    }
    details["Purchase Details"] = orders;
    details["Shipment Details"] = ships;
    final.push(details);
  }
  res.send(final);
});

router.post("/", (req, res) => {
  let { name, email, phno, city } = req.body;
  const newCust = Customers.create({
    name,
    email,
    phno,
    city,
  });
  res.end();
});

router.get("/:place", async (req, res) => {
  let city = req.params.place;
  var custs = [];
  let ships = await Shipments.find({ city: city });
  if (ships) {
    for (var ship in ships) {
      let cust = await Customers.find({ _id: ships[ship].cID }, { __v: 0 });
      custs.push(cust);
    }
    res.json(custs);
  } else {
    res.send("No shipments found in this city...");
  }
});

module.exports = router;
