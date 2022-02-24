const express = require('express')
require('./config/database')
var bodyParser = require('body-parser')
const app = express()



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// to get images from stoarage
app.get('/getImage/:imageName',(req,res)=>{
res.sendFile(__dirname + '/uploads/' + req.params.imageName)    
})


//routes
app.use('/user',require('./routes/user_router'))







app.listen(5000,()=> {
    console.log("server listening on port 5000")
})