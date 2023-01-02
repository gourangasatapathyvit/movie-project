const express = require('express');
const hbs = require("hbs")
const path = require('path')
var bodyParser = require('body-parser')


const routes = require('./routes/route');

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
const PORT = process.env.PORT || 8081;

app.use('/static', express.static(path.join('public')))
app.use('/',routes)
app.set('view engine', 'hbs')
app.set('views', 'views')




app.listen(PORT, () => {
    console.log('Server connected at:', PORT);
}) 
