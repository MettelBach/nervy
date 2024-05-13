const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const methodOverride = require('method-override');
const bookR = require('./routes/bookRouter')
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


const PORT = process.env.PORT || 4002;
const DB_USER =process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME


async function start() {
    try {
      await mongoose.connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster.btuosaf.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster`
        //useNewUrlParser: true,
        //useUnifiedTopology: true
      )
      app.listen(PORT, () => {
        console.log(`Server started on ${PORT}`);
      })
      console.log("Connected to MongoDB successfully!");
    } catch (e) {
        console.log(e)
    }
}

start()






app.post('/change/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, genre, year, notes } = req.body;
    try {
        await Book.findByIdAndUpdate(id, { title, author, genre, year, notes });
        res.redirect('/'); 
    } catch (error) {
        console.error('Failed to update the book:', error);
        res.status(500).send('Failed to update the book.');
    }
});



app.set('view engine', 'ejs')
app.set('views', 'views')


app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.use(bookR)

app.use(function (req,res,next){
    res.status(404).send("Not Found");
});






