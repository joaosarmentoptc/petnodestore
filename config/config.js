require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'petstore',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        jwtSecret: process.env.JWT_SECRET,
        jwtExpires: 28_800 // 8hours
    },
};