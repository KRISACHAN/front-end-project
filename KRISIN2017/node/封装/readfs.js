var fs = require("fs");

exports.RFS = function(dir){
  var Dir = fs.readdirSync(dir);
  return Dir.map(function(e, i, a){
    return e;
  });
};
