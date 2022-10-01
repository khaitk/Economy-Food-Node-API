const { User, Profile } = require('../models');
const { genSaltSync, hashSync } = require('bcrypt');

exports.findOne = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: 'An error occured' });
    }
};

exports.createAccount = async (req, res) => {
    try {
        const email = req.body.email;
        const salt = genSaltSync(10);
        const password = hashSync(req.body.password, salt);
        const users = await User.create({
            email: email,
            password: password,
        });
        const profile = await Profile.create({
            userId: users.id,
        });
        res.status(201).send({
            status: 201,
            message: 'Dã tạo thành công.',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: 'An error occured' });
    }
};
