const express = require('express');
const app = express();

const path = require('path');
const passport = require('passport');
const morgan = require('morgan');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const routerAPI = require('./src/routes/api');
const routerWEB = require('./src/routes/web');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true})); // false = datos - true = datos e imagenes
app.use(express.json());
app.use(cookieParser());
app.use(session({
	secret: 'moneda',
	resave: false,
	saveUninitialized: false,
	cookie: { secure: true }
}));
//app.use(passport.initialize());
//app.use(passport.session());
app.use(flash());

//Global var
app.use((req, res , next) => {

	next();
});

// Routes
app.use("/api/v1", routerAPI);
app.use(routerWEB);

// Static Files
app.use(express.static(path.join(__dirname, 'src/public')));

// Server is lintening
app.listen(app.get('port'), () => {
	console.log(`Server running on port ${app.get('port')}`);
});
