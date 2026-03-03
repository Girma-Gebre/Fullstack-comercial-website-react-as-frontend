require('dotenv').config(); // to config the .env file c
const cors = require('cors');
const express = require('express');
const postRouter = require('./crude operation/router-post');
const path = require("path")
const APP = express();
APP.use(express.static(path.join(__dirname, "../commercial-website/build"))); // keeping files in the public folder 
const port = 5000
APP.use(cors())
// APP.use(express.static); // keeping files in the public folder for local
APP.use(express.json()); // to handle the json() caming data
APP.use(express.urlencoded({extended: true})); 
APP.use('/',postRouter); // enable the router to run

// Start of to keep the page as it is when the browser is refresh
APP.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, "../commercial-website/build/index.html")); 
});
APP.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, "../commercial-website/build/index.html")); 
});
APP.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, "../commercial-website/build/index.html")); 
});
APP.get('/pricing', (req, res) => {
  res.sendFile(path.join(__dirname, "../commercial-website/build/index.html")); 
});
APP.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, "../commercial-website/build/index.html")); 
});
APP.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, "../commercial-website/build/index.html")); 
});

// End of to keep the page as it is when the browser is refresh

APP.listen(process.env.PORT || port,()=>{
    console.log(`Server is running on port ${port}`)            
})       