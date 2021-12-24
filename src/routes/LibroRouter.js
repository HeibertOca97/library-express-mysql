const {Router} = require('express');
const libroRouter = Router();
const { getTypeBooks, searchTypeBooks, showTypeBook, createTypeBook, updateTypeBook, destroyTypeBook } = require('../controller/LibroController');

//libroRouter.get('/book', index);
//libroRouter.post('/book', create);
//libroRouter.post('/book/search', search);
//libroRouter.put('/book', update);
//libroRouter.delete('/book', destroy);

libroRouter.get('/type-book', getTypeBooks);
libroRouter.get('/type-book/:id/show', showTypeBook);
libroRouter.post('/type-book/search', searchTypeBooks);
libroRouter.post('/type-book', createTypeBook);
libroRouter.put('/type-book', updateTypeBook);
libroRouter.delete('/type-book', destroyTypeBook);

module.exports = libroRouter;

