const mongoose = require('mongoose')

// URI = "mongodb+srv://diversion:souvik%40nonetwork666@diversion.ae7qi.mongodb.net/Diversion?retryWrites=true&w=majority";
// URI = process.env.URI
URI = "mongodb+srv://DIversion:souvik%40nonetwork666@diversion.8jbdy.mongodb.net/Diversion?retryWrites=true&w=majority";
mongoose.connect(URI,{
     useNewUrlParser:true,
     useUnifiedTopology:true
}).then(()=>{
     console.log("Connected")
}).catch((err)=>{
     console.log(err)
})
require('./user.model')
require('./mentor.model')
require('./contact.model')
require('./participant.model')
require('./ip.model')