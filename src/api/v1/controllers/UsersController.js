const User = require('../models/Users')

exports.findOne = (req, res) => {
    const user = User.findById(1)
    console.log(user)
}
