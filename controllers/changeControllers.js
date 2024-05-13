const Book = require('../models/book')


exports.getChange = async (req, res) => {
    
    try {
        const books = await Book.findOne({ _id: req.params.id });  
        console.log(books);  
        res.render('change', {
            title: 'Change Books',
            books: books 
        });
    } catch (err) {
        console.error(err);  
        res.status(500).send('Error retrieving books'); 
    }
};


exports.deleteBook = async (req, res) => {
    
    try {
        await Book.deleteOne({ _id: req.params.id });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to delete the book');
    }
};


