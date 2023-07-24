const express = require('express');
require('dotenv').config()
const app = express()


app.listen(process.env.PORT, () => {
    console.log('Listening to Port ' + process.env.PORT);
})

// routes
app.get('/', (req,res)=>{
    res.json({mssg: 'Welcome to the app'});
})

