const env = process.env.NODE_ENV;
const joi = require("joi");
const jwt = require('jsonwebtoken');
const service = require("./service");
const config = require('../../../config/config');

const { jwtSecret, jwtExpires } = config[env];


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

const validateEmail = (email) => service.getUserByEmail(email)
    .then(user => !!user)
    .catch(error => {
        throw error;
    });

module.exports = {
    async register(req, res, next) {
        let validatedBody;

        try {
            validatedBody = await registerSchema.validateAsync(req.body);

        } catch (error) {
            error.status = 400;
            return next(error);
        }

        try {
            if (await validateEmail(validatedBody.email)) {
                const conflictError = new Error('Email already exists');;
                conflictError.status = 409;
                throw conflictError;
            }

            const newUser = await service.register(validatedBody);
            const token = jwt.sign({ userId: newUser.id, email: newUser.email }, jwtSecret, { expiresIn: jwtExpires });

            return res.status(201).json({ newUser, token });

        } catch (error) {
            if (!error.status)
                error.status = 500;
            return next(error);
        }
    },

    async login(req, res, next) {
        try {
            const validatedBody = await loginSchema.validateAsync(req.body);
            const user = await service.validateLogin(validatedBody.email, validatedBody.password);

            if (!user) {
                const error = new Error('Invalid credentials');
                error.status = 401;
                next(error);
            }

            const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, { expiresIn: jwtExpires });
            res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    }
};