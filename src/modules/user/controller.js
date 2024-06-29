const env = process.env.NODE_ENV || 'development';
const joi = require("joi")
const service = require("./service")
const config = require('../../../config/config');
const { jwtSecret, jwtExpires } = config[env];
const jwt = require('jsonwebtoken');


const registerSchema = joi.object({
    email: joi.string().email().required(),
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    password: joi.string().required(),
});

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});

const emailExists = async (email) => {
    const results = await service.getUserByEmail(email);

    if (results)
        return true;
    return false;

}

module.exports = {
    async register(req, res, next) {
        try {

            if (await emailExists(req.body.email)) {
                throw new Error('Email already exists');
            }

            const validatedBody = await registerSchema.validateAsync(req.body);
            const newUser = await service.register(validatedBody);

            const token = jwt.sign({ userId: newUser.id, email: newUser.email }, jwtSecret, { expiresIn: jwtExpires });

            res.status(201).json({ newUser, token });
        } catch (error) {
            next(error);
        }
    },

    async login(req, res, next) {
        try {
            const validatedBody = await loginSchema.validateAsync(req.body);
            const user = await service.validateLogin(validatedBody.email, validatedBody.password);

            const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, { expiresIn: jwtExpires });
            res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    }
};