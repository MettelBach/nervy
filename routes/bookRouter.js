
const express = require('express');
const bookRouter = express.Router();
const bookControllers = require('../controllers/bookControllers');
const createControllers = require('../controllers/createControllers');
const changeControllers = require('../controllers/changeControllers');
const Book = require('../models/book');

bookRouter.get('/', bookControllers.getBooks);
bookRouter.get('/create', createControllers.getCreate);
bookRouter.post('/create', createControllers.postCreate);
bookRouter.delete('/delete/:id', changeControllers.deleteBook);

bookRouter.get('/change', changeControllers.getChange);
bookRouter.get('/change/:id', changeControllers.gettChange);
bookRouter.put('/change/:id', changeControllers.putChange);


module.exports = bookRouter;


