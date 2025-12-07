const User = require('../models/user');

const authenticate = (req, res, next) => {
    console.info('Authenticating user...');
    const user = req.session.user;
    if (!user) {
        console.warn('Authentication failed. Redirecting to login.');
        res.redirect('/login');
        return;
    }
    const userExists = User.findOne({username: user.username});
    if (!userExists) {
        console.warn('User not found in database. Redirecting to login.');
        req.session.destroy();
        res.redirect('/login');
        return;
    }
    console.info('User authenticated successfully.');
    next();
}

module.exports = {authenticate};