const express = require('express')
const bodyparser = require('body-parser')
const router = express.Router()
const mongoose = require('mongoose')
const path = require('path')
const session = require('express-session')

const newUser = mongoose.model('projects')
const newMentor = mongoose.model('mentors')
const newContact = mongoose.model('contacts')
const newpcipant = mongoose.model('participants')

router.use(express.static("public"))
router.use(bodyparser.urlencoded({
     extended:true
}))
router.use(bodyparser.json())

router.use(session({
     secret:'#098@ytr',
     saveUninitialized:true,
     resave: false
}))

key = '@no#network09'

router.get('/queries',(req,res)=>{
     
     if(req.session.ky == key){
          newContact.find((err,result)=>{
               res.render('contactsdb',{data:result})
          })
     }
     else{
          res.redirect('/onwer/')
     }
})

router.use((req,res)=>{
     res.session.ky = ""
     res.status(404).render("404page")
})


module.exports = router