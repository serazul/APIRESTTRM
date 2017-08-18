var express = require ('express');
var mongoose = require ('mongoose');
var bodyParser = require ('body-parser');

mongoose.connect('mongodb://sergiojc:future5000@ds149373.mlab.com:49373/indexdata');
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', require('./routes/api'));

app.listen(3000);
console.log('running the api');
