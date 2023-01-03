// https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/

// https://dev.to/dalalrohit/how-to-connect-to-mongodb-atlas-using-node-js-k9i

// https://stackblitz.com/


const mongoose = require('mongoose')
const testschema = mongoose.Schema({
    name:String,
    id:Number
})

module.exports = mongoose.model('testschemaCollection',testschema)