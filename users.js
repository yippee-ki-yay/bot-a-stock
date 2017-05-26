require('./user.model');

const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.createUser = async (userInfo) => {

    const user = await User.findOne({fbid: userInfo.fbid}).exec();

    if(user) {
        return user;
    }

    const newUser = new User(userInfo);

    return await newUser.save();

};

module.exports.numberOfCups = async (user) => {
    //save nuber of cups and start scheduling
};