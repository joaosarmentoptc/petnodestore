const request = require('supertest');
const app = require('../app');
const { User, Sequelize, sequelize } = require('../models');
const bcrypt = require('bcrypt');

describe('POST /user/login', () => {

    const endpoint = '/user/login';

    it('should login an existing user', async () => {
        const loginData = {
            email: 'joao.sarmento@gmail.com',
            password: 'password123'
        };

        const response = await request(app)
            .post(endpoint)
            .send(loginData);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should not login a user with an invalid password', async () => {
        const loginData = {
            email: 'joao.sarmento@gmail.com',
            password: 'invalidpassword'
        };

        const response = await request(app)
            .post(endpoint)
            .send(loginData);

        expect(response.status).toBe(401);
    });

    it('should not login a non-existing user', async () => {
        const loginData = {
            email: 'nonexistinguser@gmail.com',
            password: 'password123'
        };

        const response = await request(app)
            .post(endpoint)
            .send(loginData);

        expect(response.status).toBe(401);
    });

});

describe('POST /user/register', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    const endpoint = '/user/register';

    it('should register a new user', async () => {
        const userData = {
            email: 'joao.sarmento2@gmail.com',
            firstname: 'João',
            lastname: 'Sarmento',
            password: 'password123'
        };

        const response = await request(app)
            .post(endpoint)
            .send(userData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('newUser');
        expect(response.body).toHaveProperty('token');
    });

    it('should not register an existing user', async () => {
        const userData = {
            email: 'joao.sarmento@gmail.com',
            firstname: 'João',
            lastname: 'Sarmento',
            password: 'password123'
        };

        const response = await request(app)
            .post(endpoint)
            .send(userData);

        expect(response.status).toBe(409);
    });

    it('should not register a user with invalid data', async () => {
        const userData = {
            password: 'password123',
            firstname: 'João',
            lastname: 'Sarmento'
        };

        const response = await request(app)
            .post(endpoint)
            .send(userData);

        expect(response.status).toBe(400);
    });

    it('database error fiding a User, should catch it', async () => {

        jest.spyOn(User, 'findOne').mockRejectedValue(new Error('Database error'));

        const userData = {
            email: 'joao.sarmento+databaseerror@gmail.com',
            firstname: 'João',
            lastname: 'Sarmento',
            password: 'password123'
        };

        const response = await request(app)
            .post(endpoint)
            .send(userData);

        expect(response.status).toBe(500);
    });

    it('database error saving a User, should catch it', async () => {

        const mockUserInstance = {
            save: jest.fn().mockRejectedValue(new Error('Database error'))
        };
        jest.spyOn(User, 'build').mockReturnValue(mockUserInstance);

        const userData = {
            email: 'joao.sarmento+databaseerror@gmail.com',
            firstname: 'João',
            lastname: 'Sarmento',
            password: 'password123'
        };

        const response = await request(app)
            .post(endpoint)
            .send(userData);

        expect(response.status).toBe(500);
    });
});