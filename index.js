const express = require("express");

const { connectDB } = require("./connect.db");
const urlRoute = require("./routes/url");

const app = express();

const PORT = 8000;

// Connecting to DB
connectDB("mongodb://localhost:27017/short-url").then(
  console.log("DB connected")
);

app.use("/url", urlRoute);

app.listen(PORT, () => console.log("Server is running at ", PORT));
