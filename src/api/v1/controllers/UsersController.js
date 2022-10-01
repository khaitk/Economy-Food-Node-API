const {User} = require('../models')

exports.findOne = async (req, res) => {
    try{
        const users = await User.findAll();
        return res.json(users);
    }catch(err){
        console.log(err);
        return res.status(500).json({err: "An error occured"});
    }
}
