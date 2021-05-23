const winston = require('winston');
require('winston-transport');
require('winston-mongodb');
const error = require('./middileware/error');
const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');


winston.add(
    new winston.transports.File({ filename: "logfile.log", level: "error" })
  );
  winston.add(
    new winston.transports.MongoDB({ db: "mongodb://localhost/node" })
  );
// if(!config.get('jwtPrivateKey')){
//     console.log('FATAL ERROR: jwtPrivateKey is not defined');
//     process.exit(1);
// }

mongoose.connect('mongodb://localhost/node',{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>console.log('mongodb is connected to server...'))
.catch(err=>console.log('mongodb could not connect to server..',err))


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users',users);
app.use('/api/auth',auth);

app.use(error);
const port = process.env.PORT||3000;

app.listen(port, ()=>{
    console.log(`server is connect to ${port}....`);
});