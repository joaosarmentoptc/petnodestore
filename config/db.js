const { Sequelize } = require('sequelize');

const config = require('./config');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

class Database {
    constructor() {
        if (!Database.instance) {
            this.sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
                host: dbConfig.host,
                dialect: dbConfig.dialect,
            });

            Database.instance = this;
        }

        return Database.instance;
    }

    getSequelize() {
        return this.sequelize;
    }
}

const instance = new Database();
Object.freeze(instance);

module.exports = instance;