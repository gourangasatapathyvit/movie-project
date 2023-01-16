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

routes.get('/bookmark/:movieId', async (req, res) => {
    let query = { 'results._id': mongoose.Types.ObjectId(req.url.split('/')[2]) }
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

    if (movieData[0].results[0].bookMarkStatus === 'fa-regular') {
        queryTag = 'fa-solid'
    }
    else if (movieData[0].results[0].bookMarkStatus === 'fa-solid') {
        queryTag = 'fa-regular'
    }
    let upDateresults = await mongomodels.movieMainPageSchema.updateOne(
        query,
        {
            $set: {
                "results.$.bookMarkStatus": queryTag,
            }
        }
    );

    res.redirect(`/more-info/${req.url.split('/')[2]}`)
})


routes.get('/bookmarks/:movieId', async (req, res) => {
    let query = { 'results._id': mongoose.Types.ObjectId(req.url.split('/')[2]) }
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

    if (movieData[0].results[0].bookMarkStatus === 'fa-regular') {
        queryTag = 'fa-solid'
    }
    else if (movieData[0].results[0].bookMarkStatus === 'fa-solid') {
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

    res.redirect(`/`)
})


routes.post('/movie', async (req, res) => {
    let queriedResult = []
    console.log('search: post req hitted');
    let resultsRegex = await mongomodels.movieMainPageSchema.aggregate(
        [
            { $unwind: '$results' },
            {
                $match: {
                    'results.title': { $regex: req.body.moviename.trim().split(" ").join("|"), $options: 'i' }
                }
            },
            {
                $project: {
                    _id: 0,
                    '__v': 0
                }
            }

        ]
    );
    _.each(resultsRegex, function (item) {
        if (resultsRegex) {
            queriedResult.push(item.results)
        }
    })

    res.render('index', {
        movieData: queriedResult
    })
})

routes.get('/movies', async (req, res) => {
    let movieData = await mongomodels.movieMainPageSchema.aggregate(
        [
            {
                $project: {
                    _id: 0,  // to supress id
                    results: {
                        $filter: {
                            input: "$results",
                            as: "result",
                            cond: { $eq: ["$$result.itemsInformation.itemType", 'Movie'] }
                        }
                    }
                }
            }
        ]
    );

    // res.send(movieData[0].results)
    res.render('index', {
        movieData: movieData[0].results
    })

});

routes.get('/series', async (req, res) => {
    let movieData = await mongomodels.movieMainPageSchema.aggregate(
        [
            {
                $project: {
                    _id: 0,  // to supress id
                    results: {
                        $filter: {
                            input: "$results",
                            as: "result",
                            cond: { $eq: ["$$result.itemsInformation.itemType", 'Series'] }
                        }
                    }
                }
            }
        ]
    );

    // res.send(movieData[0].results)
    res.render('index', {
        movieData: movieData[0].results
    })

});

routes.get('/watchlater', async (req, res) => {
    let movieData = await mongomodels.movieMainPageSchema.aggregate(
        [
            {
                $project: {
                    _id: 0,  // to supress id
                    results: {
                        $filter: {
                            input: "$results",
                            as: "result",
                            cond: { $eq: ["$$result.bookMarkStatus", 'fa-solid'] }
                        }
                    }
                }
            }
        ]
    );

    // res.send(movieData[0].results)
    res.render('index', {
        movieData: movieData[0].results
    })

});



module.exports = routes