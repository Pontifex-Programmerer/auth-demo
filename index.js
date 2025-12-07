const express = require('express');
const session = require('express-session');
const dbhandler = require('./handlers/dbhandler');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const default_router = require('./routers/default_router');
const profile_router = require('./routers/profile_routes');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: true,
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(default_router);
app.use(profile_router);


app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await dbhandler.connectDB();
    console.log('Connected to the database');
});