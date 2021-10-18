const User = require('../models/User.js');
const { createToken } = require('./tokenService.js')

exports.register = async(userData) => {
    //TODO: adapt parameters to project requirements

    await User.create(userData);
};

exports.login = async(userData) => {
    //TODO: adapt parameters to project requirements
    //TODO: extra validations?
    let { username, password } = userData;

    try {
        let user = await User.findOne({ username });

        if (!user) {
            throw new Error('Invalid username'); // 'Invalid username or password'
        };

        let isValid = await user.validatePassword(password);

        if (!isValid) {
            throw new Error('Invalid password'); // 'Invalid username or password'
        };

        //TODO: create token
        let token = await createToken(user);

        return token;

    } catch (err) {
        // TODO: return error response
        console.log(err);
    }
};