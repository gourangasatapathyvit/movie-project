const express = require('express')
const _ = require('lodash')
const pagination = require('pagination');
const mongoose = require("mongoose");
const routes = express.Router()
const moviesJson = require('../../public/data/movies.json')
const mongomodels = require('../models/mongomodels')

let queryMovie = ''
let totalResultIn = 0
let rowsPerPageIn = process.env.rowsPerPageIn

function createPagination(prelinkIn, currentIn) {
    return pagination.create('search',
        {
            prelink: prelinkIn, current: currentIn, rowsPerPage: rowsPerPageIn, totalResult: totalResultIn
        });
}

routes.get('/', async (req, res) => {
    let paginationResult = null
    let queriedResult = []

    let count = await mongomodels.movieMainPageSchema.aggregate(
        [
            { $unwind: '$results' },
            { $count: 'count' }
        ]
    );

    totalResultIn = count[0].count

    if (req.query.pageno == undefined || req.query.pageno == null || req.query.pageno == '') {
        paginationResult = createPagination('/', parseInt(1))
    }
    else {
        paginationResult = createPagination('/', parseInt(req.query.pageno))
    }

    let paginationData = paginationResult.getPaginationData()

    let resultsRegex = await mongomodels.movieMainPageSchema.aggregate(
        [
            { $unwind: '$results' },
            {
                $project: {
                    '_id': 0
                }
            },
            { $skip: paginationData.fromResult - 1 },
            { $limit: (paginationData.toResult - paginationData.fromResult) + 1 },
        ]
    );

    _.each(resultsRegex, function (item) {
        if (resultsRegex) {
            queriedResult.push(item.results)
        }
    })

    res.render('index', {
        movieData: queriedResult,
        paginationData: paginationData
    })

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

async function searchData(param, tag, res) {
    let queriedResult = []
    let paginationResult = null

    if (tag == "POST") {
        if (param == undefined) {
            queryMovie = ' '
        }
        else {
            queryMovie = param.trim().split(" ").join("|")
        }

    }

    let resultsRegex = await mongomodels.movieMainPageSchema.aggregate(
        [
            { $unwind: '$results' },
            {
                $match: {
                    'results.title': { $regex: queryMovie, $options: 'i' }
                }
            },
            { "$count": "count" }
        ]
    );

    totalResultIn = resultsRegex[0].count

    if (param == undefined || param == null || param == '') {
        paginationResult = createPagination('/movie', parseInt(1))

    }
    else if (tag == 'POST') {
        paginationResult = createPagination('/movie', parseInt(1))
    }
    else {
        paginationResult = createPagination('/movie', parseInt(param))
    }

    let paginationData = paginationResult.getPaginationData()

    let resultsRegexx = await mongomodels.movieMainPageSchema.aggregate(
        [
            { $unwind: '$results' },
            {
                $match: {
                    'results.title': { $regex: queryMovie, $options: 'i' }
                }
            },
            {
                $project: {
                    _id: 0,
                    '__v': 0
                }
            },
            { $skip: paginationData.fromResult - 1 },
            { $limit: (paginationData.toResult - paginationData.fromResult) + 1 },

        ]
    );

    _.each(resultsRegexx, function (item) {
        if (resultsRegex) {
            queriedResult.push(item.results)
        }
    })

    res.render('index', {
        movieData: queriedResult,
        paginationData: paginationData
    })

}

routes.post('/movie', async (req, res) => {
    searchData(req.body.moviename, 'POST', res)
})

routes.get('/movie', async (req, res) => {
    searchData(req.query.pageno, 'GET', res)
})

routes.get('/movies', async (req, res) => {

    let resultData = null
    let queriedResult = []

    let seriesLength = await mongomodels.movieMainPageSchema.aggregate(
        [
            {
                $project: {
                    _id: 0,  // to supress id
                    results: {
                        $filter: {
                            input: "$results",
                            as: "result",
                            cond: { $eq: ["$$result.itemsInformation.itemType", 'Movie'] }
                        },

                    }
                },

            },
            { $unwind: '$results' },
            { $count: 'count' }
        ]
    );

    totalResultIn = seriesLength[0].count

    if (req.query.pageno == undefined || req.query.pageno == null || req.query.pageno == '') {
        resultData = createPagination('/movies', 1)
    }
    else {
        resultData = createPagination('/movies', parseInt(req.query.pageno))
    }

    let paginationData = resultData.getPaginationData()

    let seriesData = await mongomodels.movieMainPageSchema.aggregate(
        [
            {
                $project: {
                    _id: 0,  // to supress id
                    results: {
                        $filter: {
                            input: "$results",
                            as: "result",
                            cond: { $eq: ["$$result.itemsInformation.itemType", 'Movie'] }
                        },

                    }
                },

            },
            { $unwind: '$results' },
            { $skip: paginationData.fromResult - 1 },
            { $limit: (paginationData.toResult - paginationData.fromResult) + 1 },
        ]
    );


    _.each(seriesData, function (item) {
        if (seriesData) {
            queriedResult.push(item.results);
        }
    })

    res.render('index', {
        movieData: queriedResult,
        paginationData: paginationData
    })
});

routes.get('/series', async (req, res) => {
    let resultData = null
    let queriedResult = []

    let seriesLength = await mongomodels.movieMainPageSchema.aggregate(
        [
            {
                $project: {
                    _id: 0,  // to supress id
                    results: {
                        $filter: {
                            input: "$results",
                            as: "result",
                            cond: { $eq: ["$$result.itemsInformation.itemType", 'Series'] }
                        },

                    }
                },

            },
            { $unwind: '$results' },
            { $count: 'count' }
        ]
    );

    totalResultIn = seriesLength[0].count

    if (req.query.pageno == undefined || req.query.pageno == null || req.query.pageno == '') {
        resultData = createPagination('/series', 1)

    }
    else {
        resultData = createPagination('/series', parseInt(req.query.pageno))
    }

    let paginationData = resultData.getPaginationData()

    let seriesData = await mongomodels.movieMainPageSchema.aggregate(
        [
            {
                $project: {
                    _id: 0,  // to supress id
                    results: {
                        $filter: {
                            input: "$results",
                            as: "result",
                            cond: { $eq: ["$$result.itemsInformation.itemType", 'Series'] }
                        },

                    }
                },

            },
            { $unwind: '$results' },
            { $skip: paginationData.fromResult - 1 },
            { $limit: (paginationData.toResult - paginationData.fromResult) + 1 },
        ]
    );


    _.each(seriesData, function (item) {
        if (seriesData) {
            queriedResult.push(item.results);
        }
    })

    res.render('index', {
        movieData: queriedResult,
        paginationData: paginationData
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

routes.get('/test/', async (req, res) => {

    let queriedResult = []
    let resultsRegex = await mongomodels.movieMainPageSchema.aggregate(
        [
            { $unwind: '$results' },
            {
                $match: {
                    'results.title': { $regex: req.query.name, $options: 'i' }
                }
            },
            {
                $project: {
                    _id: 0,
                    '__v': 0,
                    'results.bookMarkStatus': 0,
                    'results.imagePath': 0,
                    'results.imdbRating': 0,
                    'results.imagePath': 0,
                    'results.itemsInformation': 0,
                    'results.originCountry': 0,
                    'results.originalLanguage': 0,
                    'results.overview': 0,
                    'results.productionHouse': 0,
                    'results.yearOfRelease': 0,

                }
            },
            { $limit: parseInt(process.env.limit) }

        ]
    );
    _.each(resultsRegex, function (item) {
        if (resultsRegex) {
            queriedResult.push(item.results)
        }
    })

    res.send(queriedResult)
})

routes.get('/tests/', (req, res) => {
    console.log(req.query.name)
    res.send(req.query)
})

routes.get('/lorem', (req, res) => {
    res.render('test2', {
        tData: [
            {
                'lorem': 1
            },
            {
                'lorem': 2
            },
            {
                'lorem': 3
            },
            {
                'lorem': 4
            },
            {
                'lorem': 5
            },
            {
                'lorem': 6
            }
        ]
    })
})

module.exports = routes