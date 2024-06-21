const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { dbConnect } = require('./utils/db');

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', require('./routes/authRoutes'));
app.use('/api', require('./routes/categoryRoutes'));
app.use('/api', require('./routes/productRoutes'));
app.use('/api', require('./routes/sellerRoutes'));

app.get('/', (req, res) => res.send('my backend'));
const port = process.env.PORT;
dbConnect();
app.listen(port, () => console.log(`server is running on port ${port}`));
