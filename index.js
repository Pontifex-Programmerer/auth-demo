const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const default_router = require('./routers/default_router');
const profile_router = require('./routers/profile_routes');
const {connectDB} = require('./handlers/dbhandler');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(default_router);
app.use(profile_router);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
});