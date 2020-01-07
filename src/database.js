const {connect }= require('mongoose')

connect('mongodb://localhost/imageShare',{useUnifiedTopology: true , useNewUrlParser: true  })
       .then(db=> console.log('db is connected successfully')) 
       .catch(err=> console.error(err))