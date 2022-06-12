// import express from "express";
const express = require("express")
const router = express.Router();
const ROUTES = require("./registered-routes/registeredRoutes")
const authentication = require("../../auth_middleware/authentication")
// import ROUTES from "./registered-routes/registeredRoutes.js";
const authorization = require("../../auth_middleware/authorization")

const simpleDoing = require("../controllers/naive-task")
// import { simpleDoing } from "../controllers/naive-task.js";
const UserController = require("../controllers/user-controller");
// import  UserController  from "../controllers/user-controller.js";

router.get(ROUTES.ROOT, (req, res) => {
  console.log("you are in root");
  res.json({ message: "CONNECTED TO SERVER" });
});


router.post(ROUTES.REGISTER, UserController.register);
router.post(ROUTES.LOG_IN, UserController.loginUser);
router.use(authentication);

router.get(ROUTES.GET_DATA,[authorization], simpleDoing.simpleDoing);
router.post(ROUTES.FETCH_MULTIPLE_EMAILS, UserController.getManyByMails);
router.get(ROUTES.ALL_EMAIL, UserController.getAllEmails);
router.get(ROUTES.DATA_BY_PARAMS, UserController.getDataByParams);
router.get(ROUTES.DATA_BY_MAIL_USER, UserController.getDataByEmail);
router.get(ROUTES.DATA_BY_CERTAIN_NAME, UserController.checkByCertainName);



module.exports = router;
