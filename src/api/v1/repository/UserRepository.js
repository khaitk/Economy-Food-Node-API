const jwt = require('jsonwebtoken');

const { Profile } = require('../models');

exports.getProfile = async (id) => {
    try {
        const dataProfile = await Profile.findOne({
            where: {
                userId: id,
            },
            attributes: ['name', 'age', 'phone', 'address'],
        });
        return dataProfile;
    } catch (err) {
        return {
            err: 'An error occured',
        };
    }
};
