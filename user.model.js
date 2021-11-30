const mongoose = require('mongoose')
const { string } = require('prop-types')

const newUserSchema = new mongoose.Schema({
     project_nm:String,
     lead_name:String,
     lead_email:String,
     project_info:String,
     project_scaleup:String,
     project_tech:String,
     project_link:String,
     project_category:String,
     project_status:String,
     lead_num:String,
     lead_college:String,
     lead_linkedin:String,
     lead_github:String,
     lead_twitter:String,
     image:String
})


module.exports = user = mongoose.model('users',newUserSchema)