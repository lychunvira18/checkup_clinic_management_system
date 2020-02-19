const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
require("dotenv/config");

// Initialize express
const app = express();

// Middleware
app.use(cors())

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
const patientsRoutes = require("./routes/patients");
app.use('/', patientsRoutes);

const visitsRoutes = require("./routes/visits")
app.use('/', visitsRoutes)

const inventoryRoutes = require("./routes/inventory")
app.use('/', inventoryRoutes)

const billingRoutes = require("./routes/billing")
app.use('/', billingRoutes)

app.get("/", (req, res) => {
  res.send("Ok");
});

//  DB Connection
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Database connection successful");
  }
);

// Listen
app.listen(process.env.PORT);
