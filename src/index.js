require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const hbs = require("hbs")
const path = require('path')
const mongomodels = require('./models/mongomodels')
const axios = require('axios')
let bodyParser = require('body-parser')
let movieJson = require('../public/data/movieJsonStructure.json')

const routes = require('./routes/route');

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
const PORT = process.env.PORT || 8081;
const url = process.env.mongourl;
// console.log(process.env.mongourl);

app.use('/static', express.static(path.join('public')))
app.use('/', routes)
app.set('view engine', 'hbs')
app.set('views', 'views')


mongoose.connect(url, async () => {

     /* mongomodels.testschema.create({
        name:"polo g loea",
        id:1,
        isUsed:false,
        "lora":1234
    }) */

    // mongomodels.movieMainPageSchema.create(movieJson)

/*     let results = await mongomodels.movieMainPageSchema.aggregate(
        [
            {
                $project: {
                    _id: 0,  // to supress id
                    results: {
                        $filter: {
                            input: "$results",
                            as: "result",
                            // cond: { $eq: ["$$result.title", "The Kashmir Files"] }
                            cond: { $eq: ["$$result._id", mongoose.Types.ObjectId('63b5cfbfbcc3196a2a23c44c')] }
                        }
                    }
                }
            }
        ]
    ); */
    // console.log(results[0]);
    console.log('mongo is connected');
})

app.listen(PORT, () => {
    console.log('Server connected at:', PORT);
}) 
