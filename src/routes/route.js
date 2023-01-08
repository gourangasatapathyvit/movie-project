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
    console.log('triggered each movie => ' + req.url.split('/')[2]);
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

    res.render('moreinfo', {
        movieResultData: movieData[0].results[0]
    })
    // console.log(movieData);

})

routes.get('/bookmark/:movieId', async(req, res) => {
    let query = {'results._id':mongoose.Types.ObjectId(req.url.split('/')[2])}
    let queryTag = ''

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

    if(movieData[0].results[0].bookMarkStatus==='fa-regular'){
        queryTag = 'fa-solid'
    }
    else if(movieData[0].results[0].bookMarkStatus==='fa-solid'){
        queryTag = 'fa-regular'
    }
    let upDateresults = await mongomodels.movieMainPageSchema.updateOne(
        query,
        {
            $set: {
                "results.$.bookMarkStatus": queryTag
            }
        }
    );

    res.redirect(`/more-info/${req.url.split('/')[2]}`)
})

module.exports = routes