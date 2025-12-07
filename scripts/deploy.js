const dbHandler = require('../handlers/dbhandler');
const User = require('../models/user');

const users = [{ username: 'testuser', password: 'password123' },{ username: 'johndoe', password: 'qwerty' }];
dbHandler.connectDB().then(() => {
    console.info('Seeding database with initial users...');
    users.forEach(u => {
        const user = new User(u);
        user.save().then(() => {
            console.info(`User ${u.username} saved to database.`);  
        }).catch(err => {
            console.error(`Error saving user ${u.username}:`, err);
        });
    });
});