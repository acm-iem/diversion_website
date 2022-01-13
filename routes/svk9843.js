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

router.get('/projects',(req,res)=>{
     newUser.estimatedDocumentCount((err,n)=>{
          count = n
          // console.log(n)
     })
     newUser.find((err,result)=>{
          if(!err)
               res.render("projectsdb",{pros:result,count:count})
     })
})

router.get('/participants',(req,res)=>{
     newpcipant.estimatedDocumentCount((err,n)=>{
          count = n
          // console.log(n)
     })
     newpcipant.find((err,result)=>{
          if(!err)
               res.render("participantsdb",{pras:result,count:count})
     })
})
router.get('/search',(req,res)=>{
     res.render('searchdb')
})
module.exports = router