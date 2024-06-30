const env = process.env.NODE_ENV;
const joi = require("joi");
const service = require("./service");
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

const validateEmail = (email) => {

    return service.getUserByEmail(email)
        .then(user => {
            return !!user;
        })
        .catch(error => {
            throw error;
        });
};

module.exports = {
    async register(req, res, next) {
        let validatedBody;

        try {
            validatedBody = await registerSchema.validateAsync(req.body);

        } catch (error) {
            res.status(400).json({ error: error.message });
            return;
        }

        try {
            if (await validateEmail(validatedBody.email)) {
                res.status(409).json({ error: 'Email already exists' });
                return;
            }

            const newUser = await service.register(validatedBody);
            const token = jwt.sign({ userId: newUser.id, email: newUser.email }, jwtSecret, { expiresIn: jwtExpires });

            res.status(201).json({ newUser, token });

        } catch (error) {
            res.status(500).json({ error: error.message });
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
            res.status(401).json({ error: 'Invalid login' });
            next(error);
        }
    }
};