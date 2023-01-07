// https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/

// https://dev.to/dalalrohit/how-to-connect-to-mongodb-atlas-using-node-js-k9i

// https://stackblitz.com/


const mongoose = require('mongoose')


const testschema = mongoose.Schema({
    name: String,
    id: Number,
    isUsed: {
        type: Boolean,
        default: true
    },
},{strict:false})

const movieMainPageSchema = mongoose.Schema({
    results: [
        {
            yearOfRelease: String,
            imagePath: String,
            title: String,
            overview: String,
            originalLanguage: String,
            imdbRating: String,
            isbookMark: {
                type: Boolean,
                default: false
            },
            originCountry: String,
            productionHouse: [String]

        }
    ]
})

module.exports = {
    testschema: mongoose.model('testschemaCollection', testschema),
    movieMainPageSchema: mongoose.model('movieMainPage', movieMainPageSchema)
}