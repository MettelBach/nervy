const Book = require('../models/book')

exports.getChange = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findOne({ bookId });  

        res.render('change', {
            title: 'Change Books',
            book: book
        });
    } catch (err) {
        console.error(err);  
        res.status(500).send('Error retrieving book'); 
    }
};

exports.putChange = async (req, res) => {
    const bookId = req.params;
    console.log(bookId);
    const { title, author, genre, year, notes } = req.body;
    try {
        await Book.findByIdAndUpdate(bookId, { title, author, genre, year, notes });
        res.redirect('/'); 
    } catch (error) {
        console.error('Failed to update the book:', error);
        res.status(500).send('Failed to update the book.');
    }
};

exports.gettChange = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.render('change', { book }); 
    } catch (error) {
        console.error('Error accessing the database:', error);
        res.status(500).send('Server error');
    }
}

exports.deleteBook = async (req, res) => {
    const bookId = req.params.id;
    try {
        await Book.deleteOne({ _id: bookId });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to delete the book');
    }
};