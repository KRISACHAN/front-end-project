var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var multer = require('multer');

app.use(express.static('public'));

var createFolder = function (folder) {
  try {
    fs.accessSync(folder);
  } catch(e) {
    fs.mkdirSync(folder);
  }
};

var uploadFolder = './public/fefile';
createFolder(uploadFolder);

var storage = multer.diskStorage({
  destination: function (request, response, callback) {
    callback(null, uploadFolder);
  },
  filename: function (request, response, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

var upload = multer({ storage: storage });

app.post("/test", upload.single('file'), function(request, response){
  var form = new formidable.IncomingForm();
  form.parse(request, function(err, fields, files) {
    console.log(files);
  });
});

app.listen(8000, function() {
  console.log('localhost:8000');
});

