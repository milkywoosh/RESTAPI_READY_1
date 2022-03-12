import express from "express";
const router = express.Router();
import ROUTES from "./registered-routes/registeredRoutes.js";
import { simpleDoing } from "../controllers/naive-task.js";

router.get(ROUTES.ROOT, (req, res) => {
  console.log("you are in root");
  res.json({ message: "CONNECTED TO SERVER" });
});

router.get(ROUTES.GET_DATA, simpleDoing);

export default router;
