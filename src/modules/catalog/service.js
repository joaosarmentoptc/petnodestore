const { Product } = require('../../../models');

const env = process.env.NODE_ENV;
const config = require('../../../config/config');

const { productPaginate } = config[env];

module.exports = {

    async getAllProducts(offset = 0, limit = productPaginate) {
        offset = parseInt(offset, 10);
        limit = parseInt(limit, 10);

        let results = await Product.findAndCountAll({ limit, offset });
        results = {
            ...results,
            prev: offset > 0 ? `/catalog?offset=${offset - limit}&limit=${limit}` : null,
            next: offset + limit < results.count ? `/catalog?offset=${offset + limit}&limit=${limit}` : null
        };
        return results;
    },
    async getProductById(id) {
        return Product.findByPk(id);
    }
};