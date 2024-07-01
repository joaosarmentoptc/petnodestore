const joi = require("joi")
const service = require("./service")

const addToCartSchema = joi.object({
    productId: joi.number().required(),
    quantity: joi.number()
});

module.exports = {
    async show(req, res, next) {
        try {
            const { userId } = req;
            const results = await service.getAllItems(userId);

            res.status(200).json(results);
        } catch (error) {
            next(error);
        }
    },

    async create(req, res, next) {
        try {
            const validatedBody = await addToCartSchema.validateAsync(req.body);
            const results = await service.addItem(req.userId, validatedBody);

            res.status(201).json(results);
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            const validatedBody = await addToCartSchema.validateAsync(req.body);
            const results = await service.removeItem(req.userId, validatedBody);
            res.status(200).json(results);
        } catch (error) {
            next(error);
        }
    }
};