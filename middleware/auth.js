const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    console.info('Authenticating user...');
    const token = req.cookies?.accessToken;
    await jwt.verify(token, 'your_jwt_secret', (err, token) => {
        if (err) {
            console.error('Token verification failed:', err);
            return null;
        }
        req.auth = token;
    });
    if (!token) {
        console.warn('No access token found. Redirecting to login.');
        res.redirect('/login');
        return;
    }
    console.info('User authenticated successfully.');
    next();
}

module.exports = {authenticate};