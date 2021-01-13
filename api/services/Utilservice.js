const bcrypt = require('bcrypt');

const salted = async (rand) =>{
    return await bcrypt.genSalt(rand);
}

module.exports = {

    hashPassword: async (password) => {
        return await bcrypt.hash(password, await salted(Math.random(20)));
    },

    comparePassword: async (password, hashedPassword) => {
        return await bcrypt.compare(password, hashedPassword);
    }
}