const path = require('path');
const express = require('express');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const expressValidator = require('express-validator');

// Init app
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(expressValidator());

// View engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

const port = process.env.PORT || 3000;
app.listen(port,() => {
	console.log(`Server running on port ${port}`);
});