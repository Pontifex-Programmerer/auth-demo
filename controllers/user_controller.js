const profile = (req, res) => {
    console.info('Profile endpoint reached, rendering user...');
    res.render('profile', {user: req.user});
}
const logout = (req, res) => {
    console.info('Logout endpoint reached, logging out user...');
    // Implement logout logic here
    res.redirect('/login');
}

const getlogin = (req, res) => {
    console.info('Login page requested');
    // Implement login logic here
    res.render('login');
}
const postlogin = (req, res) => {
    console.info('Login form submitted');
    // Implement login logic here
    const {username, password} = req.body
    console.info(`Login attempt for user: ${username}`);
    res.redirect('/profile');
}

module.exports = {profile,getlogin,postlogin,logout};