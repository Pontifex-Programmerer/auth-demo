const router = require('express').Router();
const {
    authenticate,
} = require('../middleware/auth');

const {profile,logout,getlogin, postlogin} = require('../controllers/user_controller');

router.get('/login', getlogin);

router.post('/login', postlogin);

router.get('/profile', authenticate, profile);

router.post('/logout', logout);


module.exports = router;