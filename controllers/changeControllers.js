const Book = require('../models/book')


exports.getChange = async (req, res) => {
    
    try {
        const books = await Book.findOne({ _id: req.params.id });  // Получаем все книги
        console.log(books);  // Выводим книги в консоль для проверки
        res.render('change', {
            title: 'Change Books',
            books: books  // Передаем книги в шаблон
        });
    } catch (err) {
        console.error(err);  // Выводим ошибки в консоль
        res.status(500).send('Error retrieving books');  // Отправляем сообщение об ошибке
    }
};

// Контроллер для обновления книги


// Контроллер для удаления книги
exports.deleteBook = async (req, res) => {
    
    try {
        await Book.deleteOne({ _id: req.params.id });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to delete the book');
    }
};


