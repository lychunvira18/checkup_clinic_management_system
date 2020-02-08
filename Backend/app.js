const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

// Initialize express
const app = express();

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.get("/", (req, res) => {
  res.send("Ok");
});

//  DB Connection
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to db");
  }
);

// Listen
app.listen(process.env.PORT);
