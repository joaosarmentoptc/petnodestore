// const joi = require("joi")
const service = require("./service")

module.exports = {
    async index(req, res, next) {
        try {
            const { userId } = req;
            console.log(userId);
            const results = await service.getAllItems(userId);
            res.status(200).json(results);
        } catch (error) {
            next(error);
        }
    },

    async cart_add_item(req, res, next) {
        try {
            const results = await service.addItem(req.body);
            res.status(201).json(results);
        } catch (error) {
            next(error);
        }
    }
};