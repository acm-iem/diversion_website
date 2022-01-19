const express = require('express')
const bodyparser = require('body-parser')
const router = express.Router()
const mongoose = require('mongoose')
const path = require('path')

const newUser = mongoose.model('projects')
const newMentor = mongoose.model('mentors')
const newContact = mongoose.model('contacts')
const newpcipant = mongoose.model('participants')

router.use(express.static("public"))
router.use(bodyparser.urlencoded({
     extended:true
}))
router.use(bodyparser.json())

router.get('/queries',(req,res)=>{
     newContact.find((err,result)=>{
          res.render('contactsdb',{data:result})
     })
})

module.exports = router