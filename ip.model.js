const mongoose = require('mongoose')
// const { string } = require('prop-types') //for  mac users only


const newIpSchema = new mongoose.Schema({
     ip:String,
     date:Date
})


module.exports = ip = mongoose.model('ips',newIpSchema)