const mongoose = require('mongoose')
const { string } = require('prop-types') //for  mac users only


const newMentorSchema = new mongoose.Schema({
     mentor_name:String,
     mentor_email:String,
     mentor_ph_no:String,
     mentor_city:String,
     mentor_country:String,
     mentor_past_exp:String,
     mentor_domain:String,
     mentor_status:String,
     lead_num:String,
     project_link:String,
     mentor_work:String,
     lead_linkedin:String,
     lead_github:String,
     lead_twitter:String,
     image:String
})


module.exports = user = mongoose.model('mentors',newMentorSchema)