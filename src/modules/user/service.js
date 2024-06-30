const bcrypt = require('bcrypt');
const { User } = require('../../../models');

module.exports = {

    getUserByEmail(email) {
        return User.findOne({ where: { email } })
            .then(user => user)
            .catch(error => {
                throw error;
            });
    },

    async validateLogin(email, password) {
        const user = await this.getUserByEmail(email);

        if (!user) {
            return null;
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return null;
        }

        return user;
    },

    async register(request) {

        const { email, firstname, lastname, password } = request;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = User.build({ email, firstname, lastname, password: hashedPassword });

        await user.save();

        return user;

    }
};