//const joi = require("joi")
const service = require("./service")

module.exports = {
    async register(req, res, next) {
        try {
            const results = await service.register(req.body);
            res.status(201).json(results);
        } catch (error) {
            next(error);
        }
    },
};