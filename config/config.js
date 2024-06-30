require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'petstore',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        jwtSecret: process.env.JWT_SECRET || '409db9ba349ebdeaf9bd1efd7eb2c1a01abb5aba507a4e3cb97bf074959d7696',
        jwtExpires: 28_800 // 8hours
    },
    test: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME_TEST || 'petstore_test',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        jwtSecret: process.env.JWT_SECRET || '409db9ba349ebdeaf9bd1efd7eb2c1a01abb5aba507a4e3cb97bf074959d7696',
        jwtExpires: 28_800 // 8hours
    }
};