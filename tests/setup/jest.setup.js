// jest.setup.js
const bcrypt = require('bcrypt');
const { sequelize } = require('../../models');
const { User, Product } = require('../../models');

async function createUsers() {
    await User.create({
        email: 'joao.sarmento@gmail.com',
        firstname: 'João',
        lastname: 'Sarmento',
        password: await bcrypt.hash('password123', 10)
    });
}

async function createProducts() {
    await Product.create({
        name: 'Product 1',
        price: 100,
        stock: 10,
        description: 'Product 1 description',
        brand: 'Brand 1',
        image: 'image1.png'
    });
}

async function seedDatabase() {
    await createUsers();
    await createProducts();
}

module.exports = async () => {

    await sequelize.sync({ force: true });
    await seedDatabase();
};
