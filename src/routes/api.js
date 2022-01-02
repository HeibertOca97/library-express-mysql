const router = require('express').Router();
const { getUsers, show, create, update, destroy, search } = require('../controller/UserController');
const { getTypeBooks, searchTypeBooks, showTypeBook, createTypeBook, updateTypeBook, destroyTypeBook } = require('../controller/LibroController');

// USERS
router.get('/user', getUsers);
router.get('/user/:id/show', show);
router.post('/user', create);
router.post('/user/search', search);
router.put('/user', update);
router.delete('/user', destroy);

// BOOKS
//libroRouter.get('/book', index);
//libroRouter.post('/book', create);
//libroRouter.post('/book/search', search);
//libroRouter.put('/book', update);
//libroRouter.delete('/book', destroy);

router.get('/type-book', getTypeBooks);
router.get('/type-book/:id/show', showTypeBook);
router.post('/type-book/search', searchTypeBooks);
router.post('/type-book', createTypeBook);
router.put('/type-book', updateTypeBook);
router.delete('/type-book', destroyTypeBook);

module.exports = router;
