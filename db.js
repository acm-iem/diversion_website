const mongoose = require('mongoose')

URI = "mongodb+srv://diversion:souvik%40nonetwork666@diversion.ae7qi.mongodb.net/Diversion?retryWrites=true&w=majority";
// URI = process.env.URI
mongoose.connect(URI,{
     useNewUrlParser:true,
     useUnifiedTopology:true
}).then(()=>{
     console.log("Connected")
}).catch((err)=>{
     console.log(err)
})
require('./user.model')


