const path = require('path');
const express = require('express');
const passport = require('passport');
const flash = require('connect-flash');
const User = require('./models/users-model');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cookieSession = require('cookie-session');
const membersRoutes = require('./routes/members');
const expressValidator = require('express-validator');

// Init app
const app = express();

app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000,
	secret: 'testing app'
}));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Connect-flash
app.use(flash());

app.use(expressValidator());

// View engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/members', membersRoutes);

const port = process.env.PORT || 3000;
app.listen(port,() => {
	console.log(`Server running on port ${port}`);
});