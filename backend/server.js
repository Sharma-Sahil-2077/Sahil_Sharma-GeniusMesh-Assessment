const express = require('express')
const app = express()
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require('cors');
const connectDB = require('./DBconfig/db');
const router = require('./routes/TaskRoutes');
app.use(cors());

const port = process.env.PORT || 5000;
app.use(express.json());
connectDB();

app.use('/api/task' , router );



app.get('/', (req, res) => {
  res.send('Server Working')
})


    app.listen(port, () => {
      console.log(`Server Started at Port : ${port}`);
    });
