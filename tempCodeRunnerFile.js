const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
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



const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})


app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bookR)

app.use(function (req,res,next){
    res.status(404).send("Not Found");
});