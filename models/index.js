const { Sequelize } = require('sequelize');
const database = require('../config/db');

const db = {}

db.User = require('./user')(database.sequelize, Sequelize.DataTypes);
db.Product = require('./product')(database.sequelize, Sequelize.DataTypes);
db.Cart = require('./cart')(database.sequelize, Sequelize.DataTypes);

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = database.sequelize;
db.Sequelize = Sequelize;

module.exports = db;