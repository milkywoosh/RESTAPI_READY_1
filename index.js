// import express from "express";
const express = require("express")
// import cors from "cors";
const cors = require("cors")
// import routes from "./src/routes/index.js";
const routes = require("./src/routes/index.js")
// import dotenv from "dotenv";
const dotenv = require("dotenv");

const app = express();
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
  })
);

dotenv.config();
app.use(express.json());

// all routes below;
app.use("/api", routes);

// routes
app.listen(process.env.PORT, () => {
  console.log(`listening to port ${process.env.PORT}`);
});
