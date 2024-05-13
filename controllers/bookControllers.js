const Book = require('../models/book')

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find().lean();  
        console.log(books)
        res.render('books', {
            title: 'Books List',
            isBooks: true,
            books  
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
};