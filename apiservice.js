var request = require('request');
var cheerio = require('cheerio');
var mongoose = require ('mongoose');
var schedule = require('node-schedule');
var fs = require('fs');

const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = 'mongodb://sergiojc:future5000@ds149373.mlab.com:49373/indexdata';

MongoClient.connect(MONGO_URL, (err, db) => {  
  if (err) {
    return console.log(err);
  }
var j = schedule.scheduleJob('10 * * * * *',  function(){
    var Fecha_actualizacion = new Date();

req = request.defaults({
	jar: true,                 
	rejectUnauthorized: false,
	followAllRedirects: true   
});


req.get({
    url: "https://www.superfinanciera.gov.co",
    headers: {
        'User-Agent': 'Super Cool Browser' 
     }
  },function(err, resp, body) {
      var $ = cheerio.load(body);
      var TRM = $('.cont_Indicador table tbody tr:nth-child(2) td:nth-child(2)').first().text();
req.get({
    url: "http://www.calendariodecolombia.com/pico-y-placa/bogota",
    headers:{
        'User-Agent':'cOOL'
    }
}, function(err, resp, body) {
    var $ = cheerio.load(body);
    var PPC = $('.revolution-ch2 span').text();
 
    db.collection('indexdata').insertOne(
    {
        TasaRM:  TRM,
        Picoyplaca:  PPC,
        Fecha_actualizacion: Fecha_actualizacion
    },
    function (err, res) {
      if (err) {
        db.close();
        return console.log(err);
      }
      // Success
      db.close();
    }
  )
});           
     });
});
});

