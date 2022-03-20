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
      console.log(isEmailExist);
      // return res.status(200).json({
      //   message: isEmailExist,
      // });
      if (isEmailExist.length != 0) {
        return res.status(200).json({
          message: " this email is already  exist please use another one",
        });
      }
      const hashedPassword = await encryption.generateHashedPassword(password);

      // create using QUERY HERE !
      // const now = new Date();

      try {
        const createNewUser = await sequelize.query(
          "INSERT INTO users(id_user, email, password,fname,lname) VALUES(?,?,?,?,?)",
          {
            replacements: [uuidv4(), email, hashedPassword, fname, lname],
            type: QueryTypes.INSERT,
          }
        );
        const isEmailExist = await sequelize.query(
          "SELECT * FROM users WHERE email = ?",
          {
            replacements: [email],
            type: QueryTypes.SELECT,
          }
        );
        console.log(isEmailExist);
        return res
          .status(200)
          .json({ message: "success", data: createNewUser });
      } catch (err) {
        console.log(err);
      }

      // use sequelize here !
      /*
      const createNewUser = await user.create({
        email,
        password: hashedPassword,
        fname,
        lname,
      });
      */
    } else {
      return res
        .status(400)
        .json({ message: "error", err: ERRORS.BAD_REQUEST });
    }
  };

  static fetchCertainConditions = async (req, res) => {
    const { emails } = req.body;
    let arr_input = emails.split("\n");
    /*
    emails: {
      mark_robot@gmail.com
      brown_nies@gmail.com
      john_wick@gmail.com
      */
    arr_input = arr_input.map((data) => {
      return data.replace(/ /g, "");
    });
    console.log(arr_input);
    try {
      const fetch = await sequelize.query(
        "SELECT email from users WHERE email IN(:data)",
        {
          type: QueryTypes.SELECT,
          replacements: { data: [...arr_input] }, // ["mark_robot@gmail.com","john_wick@gmail.com","brown_nies@gmail.com"]
        }
      );
      return res.json({ status: 200, message: fetch });
    } catch (err) {
      return res.json({ status: 400, message: err });
    }
  };

  static getAllEmails = async (req, res) => {
    try {
      const data = await sequelize.query("SELECT email from users");
      console.log(data)
      return res.json({status: 200, data: data[0]})
    } catch (err) {
      return res.json({ status: 400, message: err });
    }
  };
}

module.exports = UserController;
