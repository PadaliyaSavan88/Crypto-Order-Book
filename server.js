var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express()

app.use([
    cors(), 
    bodyParser.json({ limit: '50mb' }),
    bodyParser.urlencoded({ limit: '50mb', extended: true })]);
    
    mongoose = require('./config/mongoose/mongoose')
	db = mongoose()
    app.use('', require('./app/routes/token'));
    app.use('', require('./app/routes/trade'));
    require('./app/controllers/cron')
    
app.listen(8000, () => {
    console.log('Magic Happens At Port 8000')
})