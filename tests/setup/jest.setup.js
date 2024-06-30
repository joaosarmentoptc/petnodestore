// jest.setup.js
const { sequelize } = require('../../models');
const { User } = require('../../models');
const bcrypt = require('bcrypt');

module.exports = async () => {

    await sequelize.sync({ force: true });
    await seedDatabase();
};

async function seedDatabase() {
    await createUsers();
}

async function createUsers() {
    await User.create({
        email: 'joao.sarmento@gmail.com',
        firstname: 'João',
        lastname: 'Sarmento',
        password: await bcrypt.hash('password123', 10)
    });
}