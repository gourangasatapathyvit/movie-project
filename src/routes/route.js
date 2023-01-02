const express = require('express')
const routes = express.Router()
const moviesJson = require('../../public/data/movies.json')

routes.get('/', (req, res) => {
    // res.send(moviesJson.results)
    // res.render('index')
    res.render('index', {
        movieData: moviesJson.results
    })
})



module.exports = routes