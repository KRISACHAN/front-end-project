var express = require('express');
var bodyParser = require('body-parser');
var fs=require("fs");
var app = express();

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

app.use(express.static('public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/Get', function (req, res) {
  var data = [1,2,3,4,5,6,7,8,9,10];
  var cb = req.query.callback;
  if(cb){
    res.send(cb + '('+ JSON.stringify(data) + ')');
  }else{
    res.send(data);
  }
});

app.post("/Post", function(req, res){
  console.log(req.body.number);
  var data = [1,2,3,4,5,6,7,8,9,10];
  var num = parseInt(req.body.number) > data.length - 1 ? parseInt(req.body.number) : data.length - 1;
  console.log(data);
  console.log(num);
  console.log(data[num]);
  res.end(JSON.stringify(data[num]));
});

app.use(express.static(__dirname + '/static'));

var server = app.listen(8080, function () {
  var port = server.address().port
  console.log("http://localhost:%s", port)
})
