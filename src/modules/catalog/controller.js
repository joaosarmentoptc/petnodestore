const service = require("./service")

module.exports = {
    async index(req, res, next) {
        try {
            const results = await service.getAllProducts(req.query.offset, req.query.limit);
            res.status(200).json(results);
        } catch (error) {
            next(error);
        }
    },

    async show(req, res, next) {
        try {
            const results = await service.getProductById(req.params.id);
            res.status(200).json(results);
        } catch (error) {
            next(error);
        }
    },
};