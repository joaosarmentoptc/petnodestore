const request = require('supertest');
const app = require('../app');
const { User } = require('../models');

describe('POST /user/login', () => {

    const endpoint = '/user/login';

    it('given an existing user, when logging in, then the user is authenticated', async () => {
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

    it('given an invalid password, when logging in, then the user is not authenticated', async () => {
        const loginData = {
            email: 'joao.sarmento@gmail.com',
            password: 'invalidpassword'
        };

        const response = await request(app)
            .post(endpoint)
            .send(loginData);

        expect(response.status).toBe(401);
    });

    it('given a non-existing user, when logging in, then the user is not authenticated', async () => {
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

    it('given a new user, when registering, then the user is created', async () => {
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

    it('given an existing user, when registering, then the user is not created', async () => {
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

    it('given user data with invalid format, when registering, then the user is not created', async () => {
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

    it('given a database error, when registering, then the error is caught', async () => {

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
});
