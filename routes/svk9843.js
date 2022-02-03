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

router.get('/projects',(req,res)=>{
     if(req.session.ky == key){
          newUser.estimatedDocumentCount((err,n)=>{
               count = n
               // console.log(n)
          })
          newUser.find((err,result)=>{
               if(!err)
                    res.render("projectsdb",{pros:result,count:count})
          })
     }
     else{
          res.redirect('/onwer/')
     }
})

router.get('/participants',(req,res)=>{
     if(req.session.ky == key){
          newpcipant.estimatedDocumentCount((err,n)=>{
               count = n
               // console.log(n)
          })
          newpcipant.find((err,result)=>{
               if(!err)
                    res.render("participantsdb",{pras:result,count:count})
          })
     }
     else{
          res.redirect('/onwer/')
     }
})

router.get('/search',(req,res)=>{
     if(req.session.ky == key){
          qr11 = { project_status:"YES" }
          newUser.find(qr11).then((result)=>{
               res.render('searchdb',{result:result})
          })
     }
     else{
          res.redirect('/onwer/')
     }
})

router.get('/srchpro',(req,res)=>{

     if(req.session.ky == key){
          if(req.body.cat == 'pcipantp'){
               newpcipant.estimatedDocumentCount((err,n)=>{
               count = n
               // console.log(n)
               })
               qr1 = { pcipant_project:req.body.pcipant_project }
               newpcipant.find(qr1).then((result)=>{
                    res.render("participantsdb",{pras:result,count:count})
               })
          }
          else if(req.query.p == 'pro')
          {
               qr = { project_category:req.query.cat }
               newUser.countDocuments(qr).then((n)=>{
                    count = n
               // console.log(n)
               })

               newUser.find(qr).then((result)=>{
                    res.render("projectsdb",{pros:result,count:count})
               })
          }
          // else if(req.query.p == 'pra')
          // {
          //      newpcipant.estimatedDocumentCount((err,n)=>{
          //      count = n
          //      // console.log(n)
          //      })
          //      qr = { pcipant_project:req.query.pro }
          //      newpcipant.find(qr).then((result)=>{
          //           res.render("participantsdb",{pras:result,count:count})
          //      })
          // }
          //db.collectionName.find({"status": "ACTIVE"}).count()
     }
     else{
          res.redirect('/onwer/')
     }
})

router.post('/srchpro',(req,res)=>{
     if(req.session.ky == key){
          qr4 = { pcipant_project:req.body.pcipant_project }
          newpcipant.countDocuments(qr4).then((result)=>{
               res.render("peersdb",{name:req.body.pcipant_project,cn:result})
          })
     }
     else{
          res.redirect('/onwer/')
     }
})
router.get('/cts',(req,res)=>{
     if(req.session.ky == key){
          newip.find((result)=>{
                    res.render("cts",{pras:result})
               })
     }
})

router.get('/srchpra',(req,res)=>{
     if(req.session.ky == key){
          if(req.query.p == 'pro')
          {
               qr = { project_status:req.query.cat }
          }
          else if(req.query.p == 'pra')
          {
               qr = { pcipant_status:req.query.pro }
          }
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