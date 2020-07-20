var express = require('express');
var app = express();
var accountRouter = require('./router/router');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/',accountRouter);
app.listen(3000,()=>{
    console.log("start server");
})