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
const PORT = process.env.PORT || 8092;
const url = process.env.mongourl;
mongoose.set('strictQuery', true)
// console.log(process.env.mongourl);

app.use('/static', express.static(path.join('public')))
app.use('/', routes)
app.set('view engine', 'hbs')
app.set('views', 'views')
hbs.registerPartials('views/partials')

hbs.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});


mongoose.connect(url, async () => {
    // let query = { '_id': mongoose.Types.ObjectId('63b97479ac1eede3ef4f0044') }
    // mongomodels.movieMainPageSchema.create(movieJson)

    /* let upDateresult = await mongomodels.testschema.updateMany(
        query,
        {
            $set: {
                // "results.$.bookMarkStatus": queryTag,
                "testschema.res.bookMarkStatus": "holaa",
                // "bookMarkStatu": "hola"
            }
        }
    ); */


    /* mongomodels.testschema.create({
       name:"polo g loea",
       id:1,
       isUsed:false,
       "lora":1234
   }) */

    /* let results = await mongomodels.movieMainPageSchema.updateOne(
        {'results._id':mongoose.Types.ObjectId('63bab79d8ee9f60f78726237')},
        {$set:{
            "results.$.title":"hum do Hamare Do"
        }}
    ); */

    /* let resultsRegex = await mongomodels.movieMainPageSchema.aggregate(
        [
            { $unwind: '$results' },
            {
                $match: {
                    // 'results.title':  { $regex: 'the|black', $options: 'i' }
                    'results.title': { $regex: 'the|black|adam', $options: 'i' }
                }
            },
            {
                $project: {
                    _id: 0,
                    'results._id': 0,
                    '__v': 0
                }
            }
        ]
    ); */

    /*   let results = await mongomodels.movieMainPageSchema.aggregate(
          [
              {
                  $project: {
                      _id: 0,  // to supress id
                      results: {
                          $filter: {
                              input: "$results",
                              as: "result",
                              cond: { $eq: ["$$result.title", "The Kashmir Files"] }
                              // cond: { $eq: ["$$result._id", mongoose.Types.ObjectId('63ba4ab0818099c9bf301566')] }
                              // cond: {$in: [ "$$result.title", ['The Kashmir Files'] ] }
  
                              // cond: {
                              //     $regexMatch: {
                              //         input: "$$result.title",
                              //         regex: "Kashmir"
                              //     }
                              // }
  
  
                          }
                      }
                  }
              }
          ]
      ); */
    // console.log(resultsRegex);
    console.log('mongo is connected');
})

app.listen(PORT, () => {
    console.log('Server connected at:', PORT);
}) 
