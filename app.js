const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
require('dotenv').config();


require('./config/passport')(passport);

const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Express Session
app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback_secret_for_local',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24,
        secure: process.env.NODE_ENV === 'production' 
    }
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(" MongoDB Atlas Connected!"))
    .catch(err => console.error(" DB Error:", err));


app.use('/api/auth', require('./routes/auth'));
app.use('/api/food', require('./routes/food'));

app.get('/', (req, res) => {
    res.send("Mission Food rescue hub");
});

app.listen(port, () => {
    console.log(` Server running on port ${port}`);
});