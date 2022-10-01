module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        name : {
            type : Sequelize.STRING
        },
        gmail : {
            type : Sequelize.STRING
        },
        phone : {
            type : Sequelize.STRING
        },
        password : Sequelize.STRING
    })
    return Users
}
