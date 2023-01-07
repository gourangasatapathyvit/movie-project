const express = require('express')
const _ = require('lodash')
const mongoose = require("mongoose");
const routes = express.Router()
const moviesJson = require('../../public/data/movies.json')
const mongomodels = require('../models/mongomodels')

routes.get('/', async (req, res) => {
    console.log('triggered at => ' + req.url);
    let allMovieData = await mongomodels.movieMainPageSchema.find()

    res.render('index', {
        movieData: allMovieData[0].results
    })
    // console.log(allMovieData[0].results[0]);
})

routes.get('/more-info/:id', async (req, res) => {
    console.log('triggered at => ' + req.url.split('/')[2]);
    let movieData = await mongomodels.movieMainPageSchema.aggregate(
        [
            {
                $project: {
                    _id: 0,  // to supress id
                    results: {
                        $filter: {
                            input: "$results",
                            as: "result",
                            cond: { $eq: ["$$result._id", mongoose.Types.ObjectId(req.url.split('/')[2])] }
                        }
                    }
                }
            }
        ]
    );

    res.render('moreinfo',{
        movieResultData:movieData[0].results[0]
    })
    // console.log(movieData);

})

module.exports = routes