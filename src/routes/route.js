const express = require('express')
const _ = require('lodash')
const routes = express.Router()
const moviesJson = require('../../public/data/movies.json')

routes.get('/', (req, res) => {
    console.log('triggered at => ' + req.url);
    res.render('index', {
        movieData: moviesJson.results
    })
})

routes.get('/more-info/:id', (req, res) => {
    console.log('triggered at => ' + req.url);
    _.each(moviesJson.results, function (item) {
        if (req.params.id == item.id) {
            res.render('moreinfo', {
                movieResultData: item
            })
        }
    });
})

module.exports = routes