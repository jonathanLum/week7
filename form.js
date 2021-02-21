var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3366);

app.get('/',function(req,res){
  var data = [];
  for (var i in req.query){
    data.push({'name':i,'value':req.query[i]})
  }
  var context = {};
  context.urlTable = data;
  context.type = "GET"
  res.render('show-data', context);
});

app.post('/', function(req,res){
  var dataBody = [];
  for (var i in req.body){
    dataBody.push({'name':i,'value':req.body[i]})
  }
  var dataURL = [];
  for (var n in req.query){
    dataURL.push({'name':n,'value':req.query[n]})
  }
  var context = {};
  context.urlTable = dataURL;
  context.bodyTable = dataBody;
  context.type = "POST"
  res.render('show-data', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});