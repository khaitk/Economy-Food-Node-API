const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Bill extends Model {
        static associate({ Categorie }) {
            this.belongsTo(Categorie, { foreignKey: 'userId', as: 'users' });
        }
    }
    Bill.init(
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
            total: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            dateOrder: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            note: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            //define table name
            tableName: 'bill',
            modelName: 'Bill',
        },
    );
    return Bill;
};
