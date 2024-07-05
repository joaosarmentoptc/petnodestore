// jest.setup.js
const { sequelize } = require('../../models');
const { createUserForTests, createProduct, createUser } = require('../helpers/createInstances');


async function seedDatabase() {
    await createUserForTests();
    await createUser(5);
    await createProduct(15);
}

module.exports = async () => {

    await sequelize.sync({ force: true });
    await seedDatabase();
};
