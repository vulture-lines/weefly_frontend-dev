const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const express = require('express');
const flightsRoute = require('./routes/Amadeusroutes');
const connectDb = require("./config/Db.js");
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); 
app.use(cookieParser());

app.use('/api', flightsRoute);
connectDb();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
