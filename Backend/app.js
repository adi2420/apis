const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Api', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected MongoDB');
  }
});

app.get('/', (req, res) => {
  res.send('Hello world');
});
app.use('/customers', require('./routes/customers'));
app.use('/shipments', require('./routes/shipments'));
app.use('/orders', require('./routes/orders'));
app.use('/filter', require('./routes/filters'));

app.listen(3000, () => {
  console.log('Server connected on port 3000...');
});
