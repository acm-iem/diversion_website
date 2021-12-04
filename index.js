require('./db.js')
const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const multer = require('multer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')

const newUser = mongoose.model('users')
const newMentor = mongoose.model('mentors')

const port = process.env.PORT || 3000

ad_mail = 'diversioniem@outlook.com'
ad_password = 'souvik@nonetwork666'



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
app.use(express.static("public"))


app.get('/',(req,res)=>{
     res.render('index')
})
app.get('/register-page',(req,res)=>{
     res.render('register')
})

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
app.get('/guidelines',(req,res)=>{
     res.render('guidelines')
})
app.post('/register',upload.single('image'),(req,res)=>{
     const user = new newUser()
     formdata  = req.body

     user.project_nm = formdata.project_name[0]
     user.lead_name = formdata.lead_name
     user.lead_email = formdata.lead_email
     user.image = slno
     user.project_info = formdata.project_info
     user.project_scaleup = formdata.project_scaleup
     user.project_tech = formdata.project_tech
     user.project_link = formdata.project_link
     user.project_category = formdata.project_category
     user.project_status = "NO"
     user.lead_num = formdata.lead_num
     user.lead_college = formdata.lead_college
     user.lead_linkedin = formdata.lead_linkedin
     user.lead_github = formdata.lead_github
     user.lead_twitter = formdata.lead_twitter
     

     user.save((err,data)=>{
          if(!err){
               console.log("Database Saved Succesfully")
               send_Mail(formdata.lead_email)
               res.render("thankyou")
          }
          else
               console.log(err)    
     })
})


//sending mails
function send_Mail(mailid){
    //    console.log(mailid);
    
     const transporter=nodemailer.createTransport({
          service:'hotmail',
          auth:{
               user:ad_mail,
               pass:ad_password
          }
     });

     // transporter.use("compile",hbs()({
     //      viewEngine:"express-handlebars",
     //      viewPath:"./views/"
     // }))


    const mailOption={
    from:ad_mail,
    to:mailid,
    subject:'Welcome to Diversion',
    text:'You have registered for Diversion'

    };

    transporter.sendMail(mailOption,(err,result)=>{

    if(err)
         console.log(err);
    else
         console.log('Mail sent successfully!!!');
    })
}

app.post('/register-mentor',upload.single('image'),(req,res)=>{
     const user = new newMentor()
     formdata  = req.body
     console.log(formdata)
     user.mentor_name = formdata.mentor_name[0]
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
     

     user.save((err,data)=>{
          if(!err){
               console.log("Database Saved Succesfully")
               send_Mail_Mentor(formdata.mentor_email)
               res.render("thankyou")
          }
          else
               console.log(err)    
     })
})

function send_Mail_Mentor(mailid){
    //    console.log(mailid);

     const transporter=nodemailer.createTransport({
          service:'hotmail',
          auth:{
               user:ad_mail,
               pass:ad_password
          }
     });

     // transporter.use("compile",hbs({
     //      viewEngine:"express-handlebars",
     //      viewPath:"./views"
     // }))

    const mailOption={
    from:ad_mail,
    to:mailid,
    subject:'Welcome to Diversion',
    text:`Dear ${formdata.mentor_name},

          We’re delighted to inform you that you’ve filled up the mentorship registration form successfully.

          DIVERSION 2022 is an event organized by ACM-CSI IEM Student Chapter which encourages participants to contribute in open-source.Participants can contribute to a  plethora of open-source projects in various fields including AI & ML, App development and Web development.We also have projects based on hardware-related domains like IoT and robotics.

          DIVERSION 2022 will have engaging speakers/workshops throughout the event to keep participants motivated about their applications as well as provide mentors to help with technical debugging. 

          Mentors will prove to be crucial in providing important practical insights to all the participants as they contribute to various open-source projects.

          Our team is currently reviewing your application and will be contacting you soon.

          Let us join hands to celebrate this festival of Open Source contribution in it’s true spirit, in the open source event which lasts longer.

          For any further queries, please contact :  acm@iemcal.com

          Regards,
          TEAM DIVERSION
          `,
     // attachments:[
     //      { filename: 'brochure.txt',path: './brochure.txt' }
     // ],
     // template:'main'
     
    };

    transporter.sendMail(mailOption,(err,result)=>{

    if(err)
         console.log(err);
    else
         console.log('Mail sent successfully!!!');
    })
}


app.listen(port,()=>{
     console.log("Server is running at PORT 3000")
})