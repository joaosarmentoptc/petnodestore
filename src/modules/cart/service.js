const cart = require('../../../public/static/carts.json');
const catalogService = require('../catalog/service');


module.exports = {

    async getAllItems(id) {
        return cart.find(cart => cart.id === id);
    },
    async addItem(item) {
        //TODO
        const product = catalogService.getProductById(item.id);
        return product;
    }
};