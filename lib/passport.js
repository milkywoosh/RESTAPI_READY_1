const { Passport } = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const {sequelize} = require("../utils/db_connect")
const { QueryTypes } = require("@sequelize/core");

require("dotenv").config();

const options = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.SECRET_KEY,
};

const checkPayload = async (payload, done) => {
  // payload adalah hasil terjemahan JWT, sesuai dengan apa yang kita masukkan di parameter pertama dari jwt.sign

     sequelize.query(
      "SELECT * from users WHERE id_user = ?",
      { type: QueryTypes.SELECT,
        replacements: [payload.id_user],
    })
    .then(user => done(null, user))
    .catch(err => done(err, false))
    
};
const StrategyAuthorize = new JwtStrategy(options, checkPayload);

const passportPassThrough = new Passport();

passportPassThrough.use(StrategyAuthorize);

module.exports = passportPassThrough;
