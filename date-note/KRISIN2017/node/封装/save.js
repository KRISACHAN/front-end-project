const http = require("http");

const download = url => {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let Data = [];
      res.on('data', chunk => {
        Data += chunk;
      });
      res.on('end', () => resolve(Data));
    }).on('error', () => reject('error'));
  })
}

exports.download = download;