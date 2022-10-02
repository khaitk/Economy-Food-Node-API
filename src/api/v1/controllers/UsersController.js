const { genSaltSync, hashSync, bcrypt, compareSync } = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const { http, message } = require('../helpers');
const { User, Profile } = require('../models');
const { getProfile, updateProfile } = require('../repository/UserRepository');

exports.createAccount = async (req, res) => {
    try {
        const email = req.body.email;
        const salt = genSaltSync(10);
        const password = hashSync(req.body.password, salt);
        const user = await User.findOne({ where: { email: email } });

        if (user) {
            return res.status(http.AUTHENTICATION_FAIL_CODE).send({ message: message.message.EMAIL_EXISTS });
        }
        const users = await User.create({
            email: email,
            password: password,
        });
        const profile = await Profile.create({
            userId: users.id,
        });
        res.status(http.SUCCESS_CODE).send({
            status: http.SUCCESS_CODE,
            message: message.message.CREATED,
        });
    } catch (err) {
        return res.status(http.ERROR_EXCEPTION_CODE).json({ err: message.message.ERROR });
    }
};

exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(http.AUTHENTICATION_FAIL_CODE).send(message.message.EMAIL_EXISTS);
        }
        const isPasswordValid = compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(http.AUTHENTICATION_FAIL_CODE).send(message.message.INCORRECT_PASSWORD);
        }

        const currentDateObj = new Date();
        const numberOfMlSeconds = currentDateObj.getTime();
        const addMlSeconds = 60 * 1000;
        const newDateObj = new Date(numberOfMlSeconds + addMlSeconds);

        const jsonToken = jsonwebtoken.sign({ id: user.id }, 'secret', { expiresIn: '3600s' });
        return res.status(http.SUCCESS_CODE).send({
            token: jsonToken,
            expiresIn: newDateObj,
        });
    } catch (err) {
        return res.status(http.ERROR_EXCEPTION_CODE).json({
            err: message.message.ERROR,
        });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const profile = await getProfile(req.user.id);
        return res.status(http.SUCCESS_CODE).send(profile);
    } catch (err) {
        return res.status(http.ERROR_EXCEPTION_CODE).json({
            err: message.message.ERROR,
        });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        let dataProfile = {
            name: null,
            age: null,
            phone: null,
            address: null,
        };
        if (req.body.name) {
            dataProfile['name'] = req.body.name;
        }
        if (req.body.age) {
            dataProfile['age'] = req.body.age;
        }
        if (req.body.phone) {
            dataProfile['phone'] = req.body.phone;
        }
        if (req.body.address) {
            dataProfile['address'] = req.body.address;
        }
        const profile = await updateProfile(req.user.id, dataProfile);
        return res.status(http.SUCCESS_CODE).send({
            status: http.SUCCESS_CODE,
            data: profile,
        });
    } catch (err) {
        return res.status(http.ERROR_EXCEPTION_CODE).json({
            err: message.message.ERROR,
        });
    }
};
