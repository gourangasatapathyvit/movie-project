require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const hbs = require("hbs")
const exphbs = require('express-handlebars');
const path = require('path')
const mongomodels = require('./models/mongomodels')
const axios = require('axios')
let bodyParser = require('body-parser')
let movieJson = require('../public/data/movieJsonStructure.json')
let aboutJson = require('../public/data/aboutData.json')

const routes = require('./routes/route');
const imageUpload = require('./customfunc');

const imageurl = 'https://upload.wikimedia.org/wikipedia/en/3/30/Ant-Man_and_the_Wasp_Quantumania_poster.jpg'

/*     let xx =await mongomodels.movieMainPageSchema.find({},"_id")
  
      let x =await mongomodels.movieMainPageSchema.updateOne({
          "_id": xx[0]._id
      },
          {
              "$push":
              {
                  "results":
                  {
                      "yearOfRelease": "2032",
                      "imagePath": "https://lorem",
                      "title": "lorem test",
                      "overview": "In ancient Kahndaq, Teth Adam was bestowed the almighty powers of the gods. After using these powers for vengeance, he was imprisoned, becoming Black Adam. Nearly 5,000 years have passed, and Black Adam has gone from man to myth to legend. Now free, his unique form of justice, born out of rage, is challenged by modern-day heroes who form the Justice Society: Hawkman, Dr. Fate, Atom Smasher and Cyclone",
                      "originalLanguage": "en",
                      "imdbRating": "8.3",
                      "originCountry": "United States of America",
                      "productionHouse": [
                          "DC Comics"
                      ],
                      "itemsInformation": {
                          "itemType": "Movie"
                      }
                  }
              }
          }); */


// imageUpload(imageurl, process.env.imgurAccessToken, { width: 712, height: 400 })


const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
const PORT = process.env.PORT || 8092;
const url = process.env.mongourl;
mongoose.set('strictQuery', true)
// console.log(process.env.mongourl);

app.engine('.hbs', exphbs({ extname: '.hbs' }));
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
    // mongomodels.aboutSchema.create(aboutJson)

    /*     let xx =await mongomodels.movieMainPageSchema.find({},"_id")
    
        let x =await mongomodels.movieMainPageSchema.updateOne({
            "_id": xx[0]._id
        },
            {
                "$push":
                {
                    "results":
                    {
                        "yearOfRelease": "2032",
                        "imagePath": "https://lorem",
                        "title": "lorem test",
                        "overview": "In ancient Kahndaq, Teth Adam was bestowed the almighty powers of the gods. After using these powers for vengeance, he was imprisoned, becoming Black Adam. Nearly 5,000 years have passed, and Black Adam has gone from man to myth to legend. Now free, his unique form of justice, born out of rage, is challenged by modern-day heroes who form the Justice Society: Hawkman, Dr. Fate, Atom Smasher and Cyclone",
                        "originalLanguage": "en",
                        "imdbRating": "8.3",
                        "originCountry": "United States of America",
                        "productionHouse": [
                            "DC Comics"
                        ],
                        "itemsInformation": {
                            "itemType": "Movie"
                        }
                    }
                }
            }); */


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
