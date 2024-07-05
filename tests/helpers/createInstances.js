/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const faker = require('faker');
const { User, Product } = require('../../models');


const userFactory = () => ({
    //    id: faker.datatype.number(),
    email: faker.internet.email(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    password: bcrypt.hashSync(faker.internet.password(), 10)
})

const productFactory = () => ({
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    stock: faker.datatype.number(),
    description: faker.lorem.sentence(),
    brand: faker.commerce.productMaterial(),
    image: faker.image.imageUrl()
})

module.exports = {
    async createUser(count) {
        try {
            await Promise.all(Array.from({ length: count }, () => User.create(userFactory())));
        } catch (error) {
            console.error('Error creating users:', error);
        }
    },
    async createProduct(count) {
        try {
            await Promise.all(Array.from({ length: count }, () => Product.create(productFactory())));
        } catch (error) {
            console.error('Error creating users:', error);
        }
    },

    async createUserForTests() {
        const user = userFactory();
        user.email = 'joao.sarmento@gmail.com';
        user.id = 1;
        user.password = bcrypt.hashSync('password123', 10);
        await User.create(user);
    }
}