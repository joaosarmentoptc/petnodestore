//const joi = require("joi")
const service = require("./service")

module.exports = {
    async index(req, res, next) {
        try {
            const results = await service.getAllProducts();
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