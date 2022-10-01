const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        static associate({ User }) {
            this.belongsTo(User, { foreignKey: 'userId', as: 'users' });
        }
    }
    Cart.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            //define table name
            tableName: 'cart',
            modelName: 'Cart',
        },
    );
    return Cart;
};
