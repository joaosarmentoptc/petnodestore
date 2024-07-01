const request = require('supertest');
const app = require('../app');
const { Cart } = require('../models');


const QUANTITY = 10;

describe('PUT /cart', () => {

    const endpoint = '/cart';

    it('user is authenticated, should add an one item to the cart if the quantity is not specified', async () => {

        const cartData = {
            productId: 1
        };

        const response = await request(app)
            .put(endpoint)
            .set('Authorization', 'Bearer 1')
            .send(cartData);

        expect(response.status).toBe(201);
    });

    it('user is authenticated, should add an item to the cart', async () => {

        const cartData = {
            productId: 1,
            quantity: QUANTITY
        };

        const response = await request(app)
            .put(endpoint)
            .set('Authorization', 'Bearer 1')
            .send(cartData);

        expect(response.status).toBe(201);
    });

    it('user is authenticated, wrong payload', async () => {

        const cartData = {
            quantity: QUANTITY
        };

        const response = await request(app)
            .put(endpoint)
            .set('Authorization', 'Bearer 1')
            .send(cartData);

        expect(response.status).toBe(400);
    });

    it('user is not authenticated, should not add an item to the cart', async () => {

        const cartData = {
            productId: 1,
            quantity: QUANTITY
        };

        const response = await request(app)
            .put(endpoint)
            .send(cartData);

        expect(response.status).toBe(401);
    });

});

describe('GET /cart', () => {

    const endpoint = '/cart';

    it('user is authenticated, should get all items from the cart', async () => {
        const response = await request(app)
            .get(endpoint)
            .set('Authorization', 'Bearer 1');

        expect(response.status).toBe(200);
    });

    it('user is not authenticated, should not get all items from the cart', async () => {
        const response = await request(app)
            .get(endpoint);

        expect(response.status).toBe(401);
    });

    it('user is authenticated, but database error', async () => {

        jest.spyOn(Cart, 'findAll').mockRejectedValueOnce(new Error('Database error'));

        const response = await request(app)
            .get(endpoint)
            .set('Authorization', 'Bearer 1');

        expect(response.status).toBe(500);

    });
});


describe('DELETE /cart', () => {

    const endpoint = '/cart';

    it('user is authenticated, should remove one item from the cart', async () => {
        const response = await request(app)
            .delete(endpoint)
            .set('Authorization', 'Bearer 1')
            .send({ productId: 1 });
        expect(response.status).toBe(200);

    });

    it('user is authenticated, trying to remove items that are not on the cart, should raise error', async () => {
        const response = await request(app)
            .delete(endpoint)
            .set('Authorization', 'Bearer 1')
            .send({ productId: 2 });
        expect(response.status).toBe(400);

    });

    it('user is authenticated, should remove all items from the cart', async () => {
        const response = await request(app)
            .delete(endpoint)
            .set('Authorization', 'Bearer 1')
            .send({ productId: 1, quantity: QUANTITY - 1 });
        expect(response.status).toBe(200);

    });

    it('user is not authenticated, should not remove an item from the cart', async () => {
        const response = await request(app)
            .delete(endpoint)
            .send({ productId: 1 });
        expect(response.status).toBe(401);
    });
});