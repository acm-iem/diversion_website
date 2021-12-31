const mongoose = require('mongoose')
// const { string } = require('prop-types') //for  mac users only


const newPcipantSchema = new mongoose.Schema({
     pcipant_name:String,
     pcipant_email:String,
     pcipant_ph_no:String,
     pcipant_city:String,
     pcipant_country:String,
     // pcipant_past_exp:String,
     pcipant_domain:String,
     pcipant_status:String,
     pcipant_num:String,
     project_link:String,
     pcipant_project:String,
     pcipant_linkedin:String,
     pcipant_github:String,
     pcipant_twitter:String,
     image:String,
     date:Date
})


module.exports = pcipant = mongoose.model('participants',newPcipantSchema)