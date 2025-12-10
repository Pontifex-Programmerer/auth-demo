const User = require('../models/user');
const jwt = require('jsonwebtoken');

const profile = async (req, res) => {
    console.info('Profile endpoint reached, rendering user...');
    try {
        const user = await User.findById(req.auth.id);
        res.render('profile', {user});
        return;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).send('Internal Server Error');
        return;
    }
}
const logout = (req, res) => {
    console.info('Logout endpoint reached, logging out user...');
    res.clearCookie('accessToken');
    res.redirect('/login');
}

const getlogin = (req, res) => {
    console.info('Login page requested');
    if(req.cookies?.flash) {
        const message = req.cookies.flash;
        res.clearCookie('flash');
        res.render('login', {message});
        return;
    }
    res.render('login');
}

const postlogin = async (req, res) => {
    console.info('Login form submitted');
    // Implement login logic here
    const {username, password} = req.body
    console.info(`Login attempt for user: ${username}`);
    try {
        const user = await User.findOne({username});
        if (!user || user.password !== password) {
            console.warn('Invalid username or password');
            createFlashCookie(res, 'Invalid username or password');
            res.redirect('/login');
            return;
        }
        const token = jwt.sign({id: user._id}, 'your_jwt_secret', {expiresIn: '5m'});
        res.cookie('accessToken', token, {httpOnly: true, sameSite: 'strict'});
    }catch (error) {
        console.error('Error during login:', error);
        createFlashCookie(res, 'An internal error occurred. Please try again.');
        res.redirect('/login');
        return;
    }
    res.redirect('/profile');
}

function createFlashCookie(req, message) {
    console.log("Creating flash cookie with message:", message);
    req.cookie('flash', message, {httpOnly: true, sameSite: 'strict',maxAge: 5000});
}
module.exports = {profile,getlogin,postlogin,logout};