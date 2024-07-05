const request = require('supertest');
const joi = require('joi')
const app = require('../app');
const { Product } = require('../models');

const product = joi.object({
    id: joi.number(),
    name: joi.string(),
    brand: joi.string(),
    stock: joi.number(),
    price: joi.number(),
    description: joi.string(),
    image: joi.string(),
    createdAt: joi.date(),
    updatedAt: joi.date()
});

const schema = joi.object({
    count: joi.number(),
    rows: joi.array().items(product),
    prev: joi.string().allow(null),
    next: joi.string().allow(null)
});

describe('GET /catalog', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    const endpoint = '/catalog';
    it('when getting all items from the catalog, then the items are returned', async () => {
        const response = await request(app)
            .get(`${endpoint}?offset=0&limit=1`);
        const validated = await schema.validateAsync(response.body);

        expect(response.status).toBe(200);
        expect(validated.count).toBeGreaterThan(0);
        expect(validated.rows.length).toBeGreaterThan(0);
    });

    it('given the parameters offset and limit, when getting all items from the catalog, then the items are returned', async () => {
        const response = await request(app)
            .get(`${endpoint}?offset=20&limit=10`);
        const validated = await schema.validateAsync(response.body);
        expect(response.status).toBe(200);
        expect(validated.count).toBeGreaterThan(0);
    });

    it('given a product exists, when requesting that product id from the catalog, then the item is returned', async () => {
        const response = await request(app)
            .get(`${endpoint}/1`);
        const validated = await product.validateAsync(response.body);

        expect(response.status).toBe(200);
        expect(validated.id).not.toBeNull();
    });

    it('given a product does not exist, when requesting that product id from the catalog, then error is raised', async () => {
        const response = await request(app)
            .get(`${endpoint}/0`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Product not found');
    });

    it('given a database error, when getting all items from the catalog, then error is raised', async () => {

        jest.spyOn(Product, 'findAndCountAll').mockRejectedValue(new Error('Database error'));

        const response = await request(app)
            .get(endpoint);

        expect(response.body.error).toBe('Database error');
        expect(response.status).toBe(500);
    });


});