const { sequelize } = require('../../models');
// jest.setupAfterEnv.js
jest.setTimeout(5000); // Optional: Increase the timeout for slower tests

afterAll(() => sequelize.close());