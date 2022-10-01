const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate({ Categorie }) {
            this.belongsTo(Categorie, { foreignKey: 'categorieId', as: 'categorie' });
        }
    }
    Product.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            categorieId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },
        {
            sequelize,
            //define table name
            tableName: 'product',
            modelName: 'Product',
        },
    );
    return Product;
};
