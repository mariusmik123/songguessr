// læser .env fil
require('dotenv').config()

const path = require("path");
const express = require("express");

const cors = require("cors");
const app = express();
const mongoose = require('mongoose')
const connectDB = require('./config/connectDB')


const corsOptions = require("./config/corsOptions");
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:
// content-type application/json
app.use(express.json());
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

//generer port
const PORT = process.env.PORT || 3500;

// connecter til mongodb
connectDB()

//customs middleware

//serve static file
app.use("/", express.static(path.join(__dirname, "public")));

// routes

app.use("/api/albums", require("./routes/api/albums"));
app.use("/api/users", require("./routes/api/userREST"));
app.use("/api/gamecalculater", require("./routes/api/gameCalculater"));



mongoose.connection.once('open',()=>{
console.log('connected to MongoDB')
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

})

