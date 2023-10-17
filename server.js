
/*
    This file is the main server file where the app runs

    - Code written by Haytham Rahem
*/

import 'dotenv/config'
import express from 'express';
import { f_connect } from './database/database.connection.js';
import auth_routes from './routes/auth.js';
const app = express();

f_connect();
app.use(express.json())
app.use(function ( req ,res , next) {
  res.header('Access-Control-Allow-Origin' , '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods' , 'GET,HEAD,PUT,PATCH,POST,DELETE')
  res.header('Access-Control-Expose-Headers' , 'Content-Length')
  res.header('Access-Control-Allow-Headers' , req.header('Access-Control-Request-Headers'))
  if(req.method === 'OPTIONS'){
    console.log('Options')
    return res.status(200).send();
  } else{
    next();
  }
})

//Verify that the API is online
app.get('/api' , ( req , res , next ) => {
  res.status(200).json({ message : 'Hello api is online !'})
})

// Setting up the api's routs 
app.use('/api', auth_routes);

app.listen(3000, () => console.log('Example app is listening on port 3000.'));