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
     newUser.find((err,result)=>{
          if(!err)
               res.render('searchdb',{result:result})
          else
               throw err
     })
})
router.get('/srchpro',(req,res)=>{

     console.log(req.body)
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
          newUser.estimatedDocumentCount((err,n)=>{
          count = n
          // console.log(n)
          })
          qr = { project_category:req.query.cat }
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
})
router.get('/srchpra',(req,res)=>{

     if(req.query.p == 'pro')
     {
          qr = { project_status:req.query.cat }
     }
     else if(req.query.p == 'pra')
     {
          qr = { pcipant_status:req.query.pro }
     }
     // console.log(qr)
})
module.exports = router