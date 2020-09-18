const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express')
const app = express()
let port=300



app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/bugs', { useNewUrlParser: true, useUnifiedTopology:true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.use(express.static('component'));  
app.use(express.static('public'));  




app.get('/', (req, res)=>{
    res.send(`running on port ${port}`)
})

// app.use('/todos', todoRoutes)

app.listen(port,  (e)=>{
    if(e){
        console.log(e)
    }
    else(console.log(`app running in port ${port}`))
})



  
