const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const Orders = require('../models/orders');
const Shipments = require('../models/shipments');

router.get('/', async (req, res) => {
  let city = req.query.city;
  console.log(city);
  let ships = await Shipments.find({ city: city });

  res.send(ships);
});

module.exports = router;
