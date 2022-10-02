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

exports.updateProfile = async (id, profile) => {
    try {
        const dataUpdateProfile = await Profile.findOne({
            where: {
                userId: id,
            },
            attributes: ['id', 'userId', 'name', 'age', 'phone', 'address'],
        });
        dataUpdateProfile.name = profile.name;
        dataUpdateProfile.age = profile.age;
        dataUpdateProfile.phone = profile.phone;
        dataUpdateProfile.address = profile.address;
        await dataUpdateProfile.save();
        return dataUpdateProfile;
    } catch (err) {
        return {
            err: 'An error occured',
        };
    }
};
