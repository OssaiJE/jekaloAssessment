const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

// Load config
// dotenv.config({ path: "./config/config.env" });
dotenv.config();

// Connecting to DB
connectDB();

//We innitialized app for express
const app = express();

app.use(express.json());

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", require("./routes/api"));
// app.use("/manageuser", require("./routes/manageuser"));
// app.use("/dashboard", require("./routes/dashboard"));

const PORT = process.env.PORT || 2021;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
