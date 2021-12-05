const mongoose = require('mongoose')
// const { string } = require('prop-types') //for  mac users only


const newContactSchema = new mongoose.Schema({
     name:String,
     email:String,
     subject:String,
     message:String,
     date:Date
})


module.exports = user = mongoose.model('contacts',newContactSchema)