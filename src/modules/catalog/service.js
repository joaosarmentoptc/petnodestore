const catalog = require('../../../public/static/products.json');

module.exports = {

    async getAllProducts() {
        return catalog;
    },
    async getProductById(id) {
        return catalog.find(product => product.id == id);
    }
};