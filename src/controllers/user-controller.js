const ERRORS  = require("../config/error-conditions");
// import ERRORS from "../config/error-conditions.js";
const { user } = require("../../models");
// import { user } from "../../models";
const encryption = require("../../utils/encryption");
// import encryption from "../../utils/encryption.js";
// require("regenerator-runtime/runtime");

class UserController {
  static register = async (req, res) => {
    const { fname, lname, email, password } = req.body;

    if (email && password && fname && lname) {
      const checkIfEmailAlreadyStored = await user.findOne({
        where: { email },
      });
      if (checkIfEmailAlreadyStored === true) return;

      const hashedPassword = await encryption.generateHashedPassword(password);
      const createNewUser = await user.create({
        email,
        password: hashedPassword,
        fname,
        lname,
      });
      return res.status(200).json({ message: "success", data: createNewUser });
    } else {
      return res.status(400).json({message: "error", err: ERRORS.BAD_REQUEST});
    }
  };

  //   static login = async (req, res) => {};

  //   static throwError = (err) => {};
}

module.exports = UserController;
