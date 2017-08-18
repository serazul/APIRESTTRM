const admin = require('firebase-admin');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require ('mongoose');
var schedule = require('node-schedule');
var fs = require('fs');

admin.initializeApp({
  credential: admin.credential.cert('./apifirebase-6ed334775dae.json'),
  databaseURL: 'https://apifirebase-2b7b5.firebaseio.com',
});

const db = admin.database();


const ref = db.ref('indicadores');
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
        },function(err, resp, body) {       
            var $ = cheerio.load(body);
            var PPC = $('.revolution-ch2 span').text();
    
            const usersRef = ref.child('Indexers');
            usersRef.set({
                TasaRM:  TRM,
                Picoyplaca:  PPC,
                Fecha_actualizacion: Fecha_actualizacion 
    });
                });
                });
});