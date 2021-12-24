const userRouter = require('express').Router();
const { getUsers, show, create, update, destroy, search } = require('../controller/UserController');

userRouter.get('/user', getUsers);
userRouter.get('/user/:id/show', show);
userRouter.post('/user', create);
userRouter.post('/user/search', search);
userRouter.put('/user', update);
userRouter.delete('/user', destroy);

module.exports = userRouter;

