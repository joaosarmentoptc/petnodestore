const { Cart } = require('../../../models');

module.exports = {

    async getAllItems(userId) {
        return Cart.findAll({ where: { user_id: userId } });
    },
    async addItem(userId, { productId, quantity }) {

        if (!quantity)
            quantity = 1;

        const cart = await Cart.upsert({ user_id: userId, product_id: productId, quantity });
        return cart;

    },

    async removeItem(userId, { productId, quantity }) {
        if (!quantity)
            quantity = 1;

        return Cart.findOne({ where: { user_id: userId, product_id: productId } })
            .then(cart => {

                if (!cart) {
                    const error = new Error('Cart item not found');
                    error.status = 400;
                    throw error;
                }


                if (cart.quantity > quantity) {
                    return cart.decrement({ quantity });
                }

                return cart.destroy();
            })
            .catch(error => {
                throw error;
            });

    }
};