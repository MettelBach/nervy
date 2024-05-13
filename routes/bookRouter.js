
const express = require('express');
const bookRouter = express.Router();
const bookControllers = require('../controllers/bookControllers');
const createControllers = require('../controllers/createControllers');
const changeControllers = require('../controllers/changeControllers');
const Book = require('../models/book');

bookRouter.get('/', bookControllers.getBooks);
bookRouter.get('/create', createControllers.getCreate);
bookRouter.get('/change', changeControllers.getChange);
bookRouter.post('/create', createControllers.postCreate);
bookRouter.post('/delete/:id', changeControllers.deleteBook);

bookRouter.get('/change/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.render('change', { book }); // Указывается имя файла шаблона для рендеринга
    } catch (error) {
        console.error('Error accessing the database:', error);
        res.status(500).send('Server error');
    }
});



bookRouter.put('/change/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, genre, year, notes } = req.body;
    try {
        await Book.findByIdAndUpdate(id, { title, author, genre, year, notes });
        res.redirect('/');  // Возврат на главную страницу после обновления
    } catch (error) {
        console.error('Failed to update the book:', error);
        res.status(500).send('Failed to update the book.');
    }
});


module.exports = bookRouter;


