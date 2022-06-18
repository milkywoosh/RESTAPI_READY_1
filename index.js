const express = require("express");
const cors = require("cors");
const routes = require("./src/routes/index.js");
const dotenv = require("dotenv");

const app = express();
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
  })
);
// app.use(cors())


dotenv.config();
app.use(express.json());


// all routes below;
app.use("/api", routes);

// routes
app.listen(process.env.PORT, () => {
  console.log(`listening to port ${process.env.PORT}`);
});
