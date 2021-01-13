const jwt = require('jsonwebtoken');
const SECRET = "ITsANoTSecReT"

module.exports = {

    sign: (details, expiresIn) => {
        return jwt.sign(details, SECRET, { expiresIn });
    },

    verify: (token) => {
        return jwt.verify(token, SECRET);
    }
}