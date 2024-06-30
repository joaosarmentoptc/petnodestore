// jest.setup.js
const bcrypt = require('bcrypt');
const { sequelize } = require('../../models');
const { User } = require('../../models');

async function createUsers() {
    await User.create({
        email: 'joao.sarmento@gmail.com',
        firstname: 'João',
        lastname: 'Sarmento',
        password: await bcrypt.hash('password123', 10)
    });
}

async function seedDatabase() {
    await createUsers();
}

module.exports = async () => {

    await sequelize.sync({ force: true });
    await seedDatabase();
};
