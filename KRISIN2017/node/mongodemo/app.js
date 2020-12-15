const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express();
const readfs = require('./readfs');

const mongodb = require('mongodb');
const mongoose = require('mongoose');

const log = console.log.bind(console);
const err = console.error.bind(console);

const db = mongoose.createConnection('localhost', 'logindata'); // 创建一个数据库连接

const dbAsync = db => {
  return new Promise((res, rej) => {
    db.once('open', () => res(`connect db success`)); // 打开成功
    db.on('error', () => rej(`connect db error`)); // 打开失败
  });
};

dbAsync(db).then(json => log(json))
           .then(error => log(error));

const Schema = new mongoose.Schema({
  username: String,
  userpwd: String
}, {
  safe: true
});

const Model = db.model('user', Schema);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ 
  extended: false,
  type: 'application'
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  const RFS = readfs.RFS('./public');
  const RFSHtml = [];
  RFS.forEach((e,i,a) => {
    if (/\.(?=html)/gi.test(e)) {
      RFSHtml.push(e);
    }
  });
  res.send(`
    <!DOCTYPE HTML>
    <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
      <title></title>
      <style>
        html,body,a {
          margin: 0;
          padding: 0;
        }
        html, body {
          width: 100%;
          height: 100%;
        }
      </style>
    </head>
    <body>
      <ul id="menu">
      </ul>
      <script>
        'use strict';
        const filesArr = ${JSON.stringify(RFSHtml)};
        console.log(filesArr);
        const Menu = document.getElementById('menu');
        const Fragment = document.createDocumentFragment();
        for ( let i = 0; i < filesArr.length; ++i ) {
          const Li = document.createElement('li');
          const UrlName = filesArr[i].replace('\.html','');
          console.log(UrlName);
          //Li.innerHTML = '<a href=' + '"' + filesArr[i] + '.html"' +'>' + filesArr[i] + '</a>';
          Li.innerHTML = '<a href=' + '"' + filesArr[i] + '"' +'>' + UrlName + '</a>';
          Fragment.appendChild(Li);
        };
        Menu.appendChild(Fragment);
      </script>
    </body>
    </html>
  `);
});

app.post('/add', (req, res) => {
  const Entity = new Model({
    username: req.body.username,
    userpwd: req.body.userpwd
  });
  Model.find('username', (err, data) => {
    const usernum = data.filter((e, i, a) => e.username.toString() === req.body.username).length;
    if ( usernum === 0) {
      Entity.save();
    };
    res.end(JSON.stringify(usernum));
  });
});

app.post('/del', (req, res) => {
  const username = req.body.username;
  Model.remove({ username }, err => log(err));
  Model.find({ username }, (err, data) => {
    log(data.length);
    if ( data.length === 0 ) {
      res.end(JSON.stringify('0'));
    } else {
      res.end(JSON.stringify('1'));
    }
  });
  
});

app.listen(5003, () => log('connect to 5003'));