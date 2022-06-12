const ERRORS = require("../config/error-conditions");
const { user } = require("../../models");
const encryption = require("../../utils/encryption");
// const pool = require("../../utils/db_connect");
const { QueryTypes } = require("@sequelize/core");
const { pool, sequelize } = require("../../utils/db_connect");
const { v4: uuidv4 } = require("uuid");
const { search } = require("../routes");
const { async } = require("regenerator-runtime");

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

  /*
  mark_robot@gmail.com
  john_wick@gmail.com
  brown_nies@gmail.com
  rock_lee@gmail.com
  */
  static fetchCertainConditions = async (req, res) => {
    const { emails } = req.body; // get this value input from postman or web input form
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
      return res.json({ status: 200, data: data[0] });
    } catch (err) {
      return res.json({ status: 400, message: err });
    }
  };

  static getDataByParams = async (req, res) => {
    const fname = req.params.username;
    try {
      const fetch = await sequelize.query(
        "SELECT email FROM users WHERE fname LIKE :search_name ",
        {
          type: QueryTypes.SELECT,
          replacements: { search_name: fname },
        }
      );
      return res.json({ status: 200, message: fetch });
    } catch (error) {
      return res.json({ status: 400, message: error.message });
    }
  };

  static getDataByEmail = async (req, res) => {
    // need to use prepare statement, to prevent DANGER sql injection
    const emailParam = req.params.email_user; // get email_user from route url
    try {
      const fetch = await sequelize.query(
        "SELECT * FROM users WHERE email = ?",
        {
          replacements: [emailParam],
          type: QueryTypes.SELECT,
        }
      );
      console.log(fetch)
      if (fetch.length === 0) {
        return res.json({
          status: 404,
          message: "your email is not found ! please kindly recheck your email",
        });
      }
      return res.json({ status: 400, message: fetch });
    } catch (error) {
      return res.json({ status: 404, message: error });
    }
  };

  static loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const hashedPassword  = await sequelize.query(
        "SELECT password FROM users WHERE email = ?",
        {
          replacements: [email],
          type:  QueryTypes.SELECT,
        }
      )
      // console.log(hashedPassword[0].password)
      const strPassword = hashedPassword[0].password 
      const isPasswordTrue = encryption.compareHash(password, strPassword)
      if (isPasswordTrue === false) {
        return res.json({status: 200, message: "your password is wrong, please try again"})
      } else {
        return res.json({status: 200, message: "okay the password is accepted"})
      }
    
    } catch (err) {
      return res.json({status: 400, message: "errrr"})
    }

  };
}

module.exports = UserController;
