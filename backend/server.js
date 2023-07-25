const express = require('express');
const app = express()
const problemRoutes = require('./routes/problems');
const mongoose = require('mongoose')

// connect to .env file
require('dotenv').config()


// this bit of middleware converts the request body into json readable format
app.use(express.json())
// middleware to log requests
app.use((req,res,next) => {
    console.log(req.path, req.method);
    next();
})

//uses problemRouter to handle Routing
app.use('/api/problems/', problemRoutes);
// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        // once connect to database fires this function
        // ie success
        app.listen(process.env.PORT, () => {
            console.log('Listening to Port ' + process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })