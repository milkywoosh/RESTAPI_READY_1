const ERRORS = require("../config/error-conditions");
const { user } = require("../../models");
const encryption = require("../../utils/encryption");
const pool = require("../../utils/db_connect");

class UserController {
  static register = async (req, res) => {
    const { fname, lname, email, password } = req.body;

    if (email && password && fname && lname) {
      // CREATE USING QUERY HERE !
      const client = await pool.connect()
      const isEmailExist = await client.query(
        "SELECT * FROM users WHERE email = $1 ",
        [email]
      );
      console.log(isEmailExist.rowCount)
      
      /* use sequelize here 
      const checkIfEmailAlreadyStored = await user.findOne({
        where: { email },
      });
      */

      if (isEmailExist.rowCount != 0)
        return res.status(200).json({
          message: " this email is already  exist please use another one",
        });

      const hashedPassword = await encryption.generateHashedPassword(password);

      // create using QUERY HERE !
      const createNewUser = await pool.query( 
        "INSERT INTO users(email, password,fname,lname) VALUES($1, $2, $3, $4)", 
        [email, hashedPassword, fname, lname])

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
