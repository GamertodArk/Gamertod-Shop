const path = require('path');
const express = require('express');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Init app
const app = express();

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