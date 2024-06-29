const bcrypt = require('bcrypt');
const { User } = require('../../../models');
const jwt = require('jsonwebtoken');

module.exports = {

    async getUserByEmail(email) {
        try {
            const user = await User.findOne({ where: { email } });
            return user;
        } catch (error) {
            throw error;
        }
    },

    async validateLogin(email, password) {

        const user = await this.getUserByEmail(email);

        if (!user) {
            throw new Error('Invalid login');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error('Invalid login');
        }

        return user;
    },

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