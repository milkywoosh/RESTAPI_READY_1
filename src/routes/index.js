// import express from "express";
const express = require("express")
const router = express.Router();
const ROUTES = require("./registered-routes/registeredRoutes")
// import ROUTES from "./registered-routes/registeredRoutes.js";

const simpleDoing = require("../controllers/naive-task")
// import { simpleDoing } from "../controllers/naive-task.js";
const UserController = require("../controllers/user-controller");
// import  UserController  from "../controllers/user-controller.js";

router.get(ROUTES.ROOT, (req, res) => {
  console.log("you are in root");
  res.json({ message: "CONNECTED TO SERVER" });
});

router.get(ROUTES.GET_DATA, simpleDoing.simpleDoing);

router.post(ROUTES.REGISTER, UserController.register);

module.exports = router;
