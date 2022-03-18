const ERRORS = require("../config/error-conditions");
const { user } = require("../../models");
const encryption = require("../../utils/encryption");
// const pool = require("../../utils/db_connect");
const { QueryTypes } = require("@sequelize/core");
const { pool, sequelize } = require("../../utils/db_connect");
const { v4: uuidv4 } = require("uuid");

class UserController {
  static register = async (req, res) => {
    const { fname, lname, email, password } = req.body;

    if (email && password && fname && lname) {
      // CREATE USING QUERY HERE !
      // const client = await pool.connect()

      const isEmailExist = await sequelize.query(
        "SELECT * FROM users WHERE email = ?",
        {
          replacements: [email],
          type: QueryTypes.SELECT,
        }
      );

      console.log(isEmailExist.length);

      /* use sequelize here cd
      const checkIfEmailAlreadyStored = await user.findOne({
        where: { email },
      });
      */

      if (isEmailExist.length != 0) {
        return res.status(200).json({
          message: " this email is already  exist please use another one",
        });
      }
      return res.status(200).json({
        message: " okay",
      });
      const hashedPassword = await encryption.generateHashedPassword(password);

      // create using QUERY HERE !
      // const now = new Date();
      // const createNewUser = await pool.query(
      //   "INSERT INTO users(id_user, email, password,fname,lname) VALUES($1, $2, $3, $4, $5)",
      //   [uuidv4(), email, hashedPassword, fname, lname]
      // );

      // use sequelize here !
      /*
      const createNewUser = await user.create({
        email,
        password: hashedPassword,
        fname,
        lname,
      });
      */

      return res.status(200).json({ message: "success", data: createNewUser });
    } else {
      return res
        .status(400)
        .json({ message: "error", err: ERRORS.BAD_REQUEST });
    }
  };

  //   static login = async (req, res) => {};

  //   static throwError = (err) => {};
}

module.exports = UserController;
