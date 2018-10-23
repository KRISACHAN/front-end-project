const express = require('express');
const app = express();
const fs = require("fs");
const readfs = require('./readfs');

app.use(express.static('public'));

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

const server = app.listen(9000, () => {
  console.log(`localhost:9000`);
});
