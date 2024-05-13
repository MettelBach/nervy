const Book = require('../models/book')



exports.getCreate = (req, res) => {
    res.render('create', {
        title: 'Add Books',
        isCreate: true
    });
};

exports.postCreate = async (req, res) => {
    try {
        const books = new Book({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            year: req.body.year,
            complete: req.body.complete || false,
            notes: req.body.notes || ''
        });

        await books.save();
        res.redirect('/'); 
    } catch (e) {
        console.error(e);
        res.status(500).send('Failed to create a new book');
    }
};