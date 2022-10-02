const { genSaltSync, hashSync, bcrypt, compareSync } = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const { User, Profile } = require('../models');
const { getProfile } = require('../repository/UserRepository');

exports.createAccount = async (req, res) => {
    try {
        const email = req.body.email;
        const salt = genSaltSync(10);
        const password = hashSync(req.body.password, salt);
        const user = await User.findOne({ where: { email: email } });

        if (user) {
            return res.status(403).send({ message: 'Email này đã tồn tại' });
        }
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

exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log(email, password);
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(401).send('Tên đăng nhập không tồn tại.');
        }
        const isPasswordValid = compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Mật khẩu không chính xác.');
        }

        const currentDateObj = new Date();
        const numberOfMlSeconds = currentDateObj.getTime();
        const addMlSeconds = 60 * 1000;
        const newDateObj = new Date(numberOfMlSeconds + addMlSeconds);

        const jsonToken = jsonwebtoken.sign({ id: user.id }, 'secret', { expiresIn: '30s' });
        return res.status(200).send({
            token: jsonToken,
            expiresIn: newDateObj,
        });
    } catch (err) {
        return res.status(500).json({
            err: 'An error occured',
        });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const profile = await getProfile(req.user.id);
        return res.status(200).send({
            data: profile,
        });
    } catch (err) {
        return res.status(500).json({
            err: 'An error occured',
        });
    }
};
