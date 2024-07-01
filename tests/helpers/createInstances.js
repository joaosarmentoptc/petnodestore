const bcrypt = require('bcrypt');
const { User, Product, Cart } = require('../../models');


module.exports = {
    async createUser() {
        const user = await User.upsert({
            id: 1,
            email: 'joao.sarmento+helper@gmail.com',
            firstname: 'João',
            lastname: 'Sarmento',
            password: await bcrypt.hash('password123', 10)
        });
        return user;
    },
    async createProduct() {
        const product = await Product.create({
            name: 'Product 1',
            price: 100,
            stock: 10,
            description: 'Product 1 description',
            brand: 'Brand 1',
            image: 'image1.png'
        });
        return product;
    }
}