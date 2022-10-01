const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BillDetail extends Model {
        static associate({ Categorie }) {
            this.belongsTo(Categorie, { foreignKey: 'userId', as: 'users' });
        }
    }
    BillDetail.init(
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
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            billId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            quantity: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },
        {
            sequelize,
            //define table name
            tableName: 'bill_detail',
            modelName: 'BillDetail',
        },
    );
    return BillDetail;
};
