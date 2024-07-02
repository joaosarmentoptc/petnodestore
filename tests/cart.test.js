const request = require('supertest');
const app = require('../app');
const { Cart } = require('../models');


const QUANTITY = 10;

describe('PUT /cart', () => {

    const endpoint = '/cart';

    it('given a user is authenticated, when adding an item to the cart without quantity, then one item is added', async () => {

        const cartData = {
            productId: 1
        };

        const response = await request(app)
            .put(endpoint)
            .set('Authorization', 'Bearer 1')
            .send(cartData);

        expect(response.status).toBe(201);
    });

    it('given a user is authenticated, when adding an item to the cart with quantity, then the item is added with that quantity', async () => {

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

    it('given a user is authenticated, when adding an item to the cart with wrong payload, then error is raised', async () => {

        const cartData = {
            quantity: QUANTITY
        };

        const response = await request(app)
            .put(endpoint)
            .set('Authorization', 'Bearer 1')
            .send(cartData);

        expect(response.status).toBe(400);
    });

    it('given a user is not authenticated, when adding an item to the cart, then error is raised', async () => {

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

    it('given a user is authenticated, when getting all items from the cart, then the items are returned', async () => {
        const response = await request(app)
            .get(endpoint)
            .set('Authorization', 'Bearer 1');

        expect(response.status).toBe(200);
    });

    it('given a user is not authenticated, when getting all items from the cart, then error is raised', async () => {
        const response = await request(app)
            .get(endpoint);

        expect(response.status).toBe(401);
    });

    it('given a user is authenticated, when there is a database error getting the cart items, then error is raised', async () => {

        jest.spyOn(Cart, 'findAll').mockRejectedValueOnce(new Error('Database error'));

        const response = await request(app)
            .get(endpoint)
            .set('Authorization', 'Bearer 1');

        expect(response.status).toBe(500);

    });
});

describe('DELETE /cart', () => {

    const endpoint = '/cart';

    it('given a user is authenticated, when removing one item from the cart, then the item is removed', async () => {
        const response = await request(app)
            .delete(endpoint)
            .set('Authorization', 'Bearer 1')
            .send({ productId: 1 });
        expect(response.status).toBe(200);

    });

    it('given a user is authenticated, when removing items that are not on the cart, then error is raised', async () => {
        const response = await request(app)
            .delete(endpoint)
            .set('Authorization', 'Bearer 1')
            .send({ productId: 2 });
        expect(response.status).toBe(400);

    });

    it('given a user is authenticated, when removing all items from the cart, then all items are removed', async () => {
        const response = await request(app)
            .delete(endpoint)
            .set('Authorization', 'Bearer 1')
            .send({ productId: 1, quantity: QUANTITY - 1 });
        expect(response.status).toBe(200);

    });

    it('given a user is not authenticated, when removing an item from the cart, then error is raised', async () => {
        const response = await request(app)
            .delete(endpoint)
            .send({ productId: 1 });
        expect(response.status).toBe(401);
    });
});

