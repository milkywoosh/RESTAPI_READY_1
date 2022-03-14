const bcrypt = require('bcrypt');

module.exports = {
    generateHashedPassword : (string) => bcrypt.hashSync(string, 10) ,

    compareHash : (string, hashedPass) => bcrypt.compareSync(string,hashedPass)
}