require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const hbs = require("hbs")
const path = require('path')
const testschema = require('./models/mongomodels')
const axios = require('axios')
let bodyParser = require('body-parser')


const routes = require('./routes/route');

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
const PORT = process.env.PORT || 8081;
const url = process.env.mongourl;
console.log(process.env.mongourl);

app.use('/static', express.static(path.join('public')))
app.use('/',routes)
app.set('view engine', 'hbs')
app.set('views', 'views')


const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,async ()=>{
    // testschema.create({
    //     name:"polo",
    //     id:1
    // })
    console.log(await testschema.find());
    console.log('mongo is connected');
})

app.listen(PORT, () => {
    console.log('Server connected at:', PORT);
}) 
