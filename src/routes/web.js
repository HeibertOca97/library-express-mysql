const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('index', {
		title: "Home"
	});
});

router.get('/signin', (req, res) => {
	res.render('login', {
		title: "Login",
		message: req.flash('loginMessage')
	});
});
	
router.post('/signin', (req, res)=>{

});

router.get('/signup', (req, res) => {
	res.render('register', {
		title: "Register",
		message: req.flash('registerMessage')
	});
});

router.post('signup', (req, res) => {

});

router.get('/dashboard', (req, res) => {

	res.render('dashboard', {
		title: "Dashboard",
	});
});

module.exports = router;
