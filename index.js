const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express')
const passport = require("passport");

const app = express()
let port=300


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(passport.initialize());
require("./config/passport")(passport);

const user_router= require('./controllers/users_controllers')
const bugs_router= require('./controllers/bugs_controllers')


let uri = "mongodb+srv://major:major@cluster0.el0eg.gcp.mongodb.net/major?retryWrites=true&w=majority"||"mongodb://127.0.0.1:27017/bugs"


app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());
app.use(bodyParser.json());
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true, });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.use(express.static('component'));  
app.use(express.static('public'));  




app.get('/', (req, res)=>{
    res.send(`running on port ${port}`)
})

app.use('/user', user_router)
app.use('/bugs', bugs_router)
app.listen(port,  (e)=>{
    if(e){
        console.log(e)
    }
    else(console.log(`app running in port ${port}`))
})



  
