require('./db.js')
const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const multer = require('multer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')
const {spawn} = require('child_process')

const newUser = mongoose.model('projects')
const newMentor = mongoose.model('mentors')
const newContact = mongoose.model('contacts')
const newpcipant = mongoose.model('participants')
const svk9843 = require('./routes/svk9843.js')
const svk123 = require('./routes/svk123')

const port = process.env.PORT || 3000

ad_mail = 'diversioniem@outlook.com'
ad_password = 'souvik@nonetwork666'

// async:true


//image upload path and name set
let slno
const storage = multer.diskStorage({
     destination : (req,file,cb)=>{
          cb(null,'public/projectimg')
     },
     filename : (req,file,cb)=>{
          slno = Date.now()+path.extname(file.originalname)
          cb(null,slno)
     }
})
const upload = multer({
     storage : storage
})

app.set('view engine','ejs')
app.use(bodyparser.urlencoded({
     extended:true
}))
app.use(bodyparser.json())
app.use(express.static("public"))
app.use('/svk@83270',svk9843)
app.use('/svk@123',svk123)


app.get('/',(req,res)=>{
     // res.render('index')

     newUser.find((err,data)=>{
          res.render('index',{data:data})
     })
})
// app.get('/register-page',(req,res)=>{
//      res.render('register')
// })

app.get('/portfolio-details',(req,res)=>{
     res.render('portfolio-details')
})

app.get('/leaderboard',(req,res)=>{
     res.render('leaderboard')
})


//registering projects

app.get('/mentor_form',(req,res)=>{
     res.render('register_mentor')
})
app.get('/participant_form',(req,res)=>{
     // res.render('register_pcipant')
     newUser.find((err,data)=>{
          res.render('register_pcipant',{data:data})
     })
})
app.get('/guidelines',(req,res)=>{
     res.render('guidelines')
})
app.post('/register',upload.single('image'),(req,res)=>{
     const user = new newUser()
     formdata  = req.body
     console.log(formdata)
     user.project_nm = formdata.project_name
     user.lead_name = formdata.lead_name
     user.lead_email = formdata.lead_email
     user.image = slno
     user.project_info = formdata.project_info
     user.project_scaleup = ""
     user.project_tech = formdata.project_tech
     user.project_link = formdata.project_link
     user.project_category = formdata.project_category
     user.project_status = "NO"
     user.lead_num = formdata.lead_num
     user.lead_college = formdata.lead_college
     user.lead_linkedin = formdata.lead_linkedin
     user.lead_github = formdata.lead_github
     user.lead_twitter = formdata.lead_twitter
     user.date = Date.now()

     user.save((err,data)=>{
          if(!err){
               console.log("Database Saved Succesfully")
               
               var dataToSend;
               const python = spawn('python', ['script1.py', formdata.lead_email, user.lead_name, "lead"]);
               python.stdout.on('data', function (data) {
                dataToSend = data.toString();
               });
               python.on('close', ()=>{
                    console.log(dataToSend);

               });
               res.render("thankyou")
          }
          else
               console.log(err)    
     })
})


//sending mails

//for mentor


app.post('/register-mentor',upload.single('image'),(req,res)=>{
     const user = new newMentor()
     formdata  = req.body
     console.log(formdata)
     user.mentor_name = formdata.mentor_name
     user.mentor_email = formdata.mentor_email
     user.mentor_ph_no = formdata.mentor_ph_no
     user.image = slno
     user.mentor_city = formdata.mentor_city
     user.mentor_country = formdata.mentor_country
     user.mentor_past_exp = formdata.mentor_past_exp
     user.project_link = formdata.project_link
     user.mentor_domain = formdata.mentor_domain
     user.mentor_status = "NO"
     // user.lead_num = formdata.lead_num
     user.mentor_work = formdata.mentor_work
     user.lead_linkedin = formdata.lead_linkedin
     user.lead_github = formdata.lead_github
     user.lead_twitter = formdata.lead_twitter
     user.date = Date.now()
     

     user.save((err,data)=>{
          if(!err){
               console.log("Database Saved Succesfully")
               
               var dataToSend;

     const python = spawn('python', ['script1.py', formdata.mentor_email, user.mentor_name, "mentor"]);
     
     python.stdout.on('data', function (data) {
     //  console.log('Pipe data from python script ...');
      dataToSend = data.toString();
     });

     python.on('close', (code) => {
     // console.log(`child process close all stdio with code ${code}`);
     
     console.log(dataToSend);

     });
     // console.log("ok")
     res.render("thankyou")
          }
          else
               console.log(err)    
     })
})

//regitering participants

app.post('/register-pcipant',(req,res)=>{
     const user = new newpcipant()
     formdata  = req.body
     console.log(formdata)
     user.pcipant_name = formdata.pcipant_name
     user.pcipant_email = formdata.pcipant_email
     user.pcipant_ph_no = formdata.pcipant_ph_no
     // user.image = slno
     user.pcipant_city = formdata.pcipant_city
     user.pcipant_country = formdata.pcipant_country
     // user.pcipant_past_exp = formdata.pcipant_past_exp
     // user.project_link = formdata.project_link
     // user.pcipant_domain = formdata.pcipant_domain
     user.pcipant_status = "NO"
     // user.pcipant_num = formdata.pcipant_num
     user.pcipant_project = formdata.pcipant_project
     user.pcipant_linkedin = formdata.pcipant_linkedin
     user.pcipant_github = formdata.pcipant_github
     user.pcipant_twitter = formdata.pcipant_twitter
     user.pcipant_college = formdata.pcipant_college
     user.date = Date.now()
     

     user.save((err,data)=>{
          if(!err){
               console.log("Database Saved Succesfully")
               var dataToSend;
               const python = spawn('python', ['script1.py', user.pcipant_email, user.pcipant_name, "pcipant"]);
               python.stdout.on('data', function (data) {
               dataToSend = data.toString();
               console.log("Process spawn")
               });
               python.on('close', (code) => {
                    console.log(dataToSend);
               });
               res.render("thankyou")
          }
          else
               console.log(err)    
     })
})


app.post('/contactus',(req,res)=>{

     const user = new newContact()
     formdata  = req.body
     console.log(formdata)
     user.name = formdata.cname
     user.email = formdata.cemail
     user.subject = formdata.csubject
     user.message = formdata.cmessage
     user.date = Date.now()
     user.save((err,data)=>{
          if(!err){
               console.log("Database Saved Succesfully")
               res.render('thankyou2')
          }
          else
               console.log(err)    
     })
})

app.get('/projects',(req,res)=>{
     newUser.find((err,data)=>{
          res.render('projects',{data:data})
     })
     
})

app.post('/prs',(req,res)=>{
     tag = req.body.m
     console.log(tag)
     qr = { project_category:tag }
     let s = ""
     newUser.find(qr).then((result)=>{
          result.map((data)=>{
               // console.log(data)
               s += `<div class="col-lg-4 col-md-6 portfolio-item filter-app">
                         <div class="portfolio-wrap">
                           <img
                             src="assets/img/portfolio/portfolio-6.jpg"
                             class="img-fluid"
                             alt=""
                           />
                           <div class="portfolio-links">
                             <a
                               href="assets/img/portfolio/portfolio-6.jpg"
                               data-gallery="portfolioGallery"
                               class="portfolio-lightbox"
                               title="${data.project_nm}"
                               ><i class="bi bi-plus"></i
                             ></a>
                             <a href="#" title="More Details"
                               ><i class="bi bi-link"></i
                             ></a>
                           </div>
                           <div class="portfolio-info">
                             <h4>Coming soon</h4>
                             <p>${data.project_info}</p>
                           </div>
                         </div>
                    </div>`
          })
          res.send(s)
     })
})

app.listen(port,()=>{
     console.log("Server is running at PORT 3000")
})