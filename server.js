const express = require('express')
const db =require('./connection')
const dotenv = require('dotenv')
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const routes = require('./routes/pages')
const publicDirectory= path.join(__dirname,'./public')
app.use(express.static(publicDirectory))

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
const PORT = process.env.PORT

app.use('/',routes);

app.listen(PORT,()=>{
    console.log("Server started on port 5001");
})