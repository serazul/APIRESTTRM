var restful = require ('node-restful');
var mongoose = restful.mongoose;

var dataSchema = new mongoose.Schema({
  TasaRM: String,
  Picoyplaca: String,
  Date : { type: Date, default: Date.now}
});
 module.exports = restful.model('DATA', dataSchema);
