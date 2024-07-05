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
                port: dbConfig.port
            });

            Database.instance = this;
        }
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    getSequelize() {
        return this.sequelize;
    }
}

const instance = Database.getInstance();
Object.freeze(instance);

module.exports = instance;