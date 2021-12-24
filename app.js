const express = require('express');
const app = express();
const userRouter = require('./src/routes/UserRouter');
const libroRouter = require('./src/routes/LibroRouter');

// Settings
app.set('port', process.env.PORT || 3000);
app.use(express.json());

// Middleware


// Routers
app.use(userRouter);
app.use(libroRouter);

app.listen(app.get('port'), () => {
	console.log(`Server running on port ${app.get('port')}`);
});
