const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
require("dotenv/config");

// Initialize express
const app = express();

// Middleware
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", process.env.FRONT_END);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
//   next();
// });
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
