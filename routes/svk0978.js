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
const newip = mongoose.model('ips')

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

router.get('/',(req,res)=>{
     const ipo = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
     const nip = new newip()
     nip.ip = ipo
     nip.date = Date.now()
     nip.save()
     res.render("login",{data:'1'})
     req.session.destroy()
})
router.post('/',(req,res)=>{
     code = req.body.cd
     if(code == key){
          req.session.ky = code
          req.session.save()
          res.render("cp")
     }
     else if(code == "kuper@123"){
          req.session.ky = code
          req.session.save()
          newContact.find((err,result)=>{
               res.render("contactsdb",{data:result})
          })
     }
     else{
          req.session.ky = ""
          res.render("login",{data:'0'})
     }
})

router.use((req,res)=>{
     res.session.ky = ""
     res.status(404).render("404page")
})

module.exports = router