const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Categorie extends Model {
        static associate({ Categorie }) {
            this.belongsTo(Categorie, { foreignKey: 'categorieId', as: 'categorie' });
        }
    }
    Categorie.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            //define table name
            tableName: 'categorie',
            modelName: 'Categorie',
        },
    );
    return Categorie;
};
