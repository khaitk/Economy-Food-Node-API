const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Profile extends Model {
        static associate({ User }) {
            this.belongsTo(User, { foreignKey: 'userId', as: 'users' });
        }
    }
    Profile.init(
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
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Name is required' },
                    notEmpty: { msg: 'Name cannot be empty' },
                },
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            //define table name
            tableName: 'profile',
            modelName: 'Profile',
        },
    );
    return Profile;
};
