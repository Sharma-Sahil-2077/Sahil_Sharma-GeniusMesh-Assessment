const express = require('express')
const app = express()
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require('cors');
app.use(cors());

const port = process.env.PORT || 5000;



app.get('/', (req, res) => {
  res.send('Server Working')
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected.');

    app.listen(port, () => {
      console.log(`Server Started at Port : ${port}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });