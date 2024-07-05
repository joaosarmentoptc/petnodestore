module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        brand: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {});

    Product.associate = (models) => {
        Product.belongsToMany(models.User, { through: models.Cart, foreignKey: 'product_id', otherKey: 'user_id' });
    };

    return Product;
};