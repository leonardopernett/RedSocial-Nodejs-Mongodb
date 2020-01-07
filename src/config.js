const express = require('express')
const morgan = require('morgan')
const path = require('path')
const exphbs = require('express-handlebars')
const error = require('express-handlebars')
const multer = require('multer')
//initialization
const app = express()

//setting 
app.set('port', process.env.PORT || 3001)
app.set('views', path.join(__dirname, 'views'))
//express-handlebars 

//handlebars
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./helpers/handlebars.js')
}))

app.set('view engine', '.hbs')


const storage = multer.diskStorage({
    destination: path.resolve('./src/public/uploads'),
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
})

//middleware
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(multer({ storage: storage }).single('image'))

//routes
app.use(require('./routes/index.js'))

//static file
app.use(express.static(path.join(__dirname, 'public')))

//error 
if (app.get('dev') === 'development') {
    app.use(error())
}


module.exports = app