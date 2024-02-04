const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;

    } catch (error) {
        throw error;
    }

}

const verifyPassword = async (password, hashedPassword) => {
    const comparePassword = await bcrypt.compare(password, hashedPassword);
    return comparePassword;
}


module.exports = { hashPassword, verifyPassword };