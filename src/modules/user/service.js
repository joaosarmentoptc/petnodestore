const bcrypt = require('bcrypt');
const { User } = require('../../../models');
const jwt = require('jsonwebtoken');

module.exports = {

    async register(request) {
        try {
            const { email, firstname, lastname, password } = request;
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = User.build({ email, firstname, lastname, password: hashedPassword });

            await user.save();

            return user;
        } catch (error) {

            throw error;
        }
    }
};