var express = require('express');
var path  = require('path');

var app = express();

// middleware
app.use(express.static(path.join(__dirname + '/views')));

app.get('/*', function(req, res){
  console.log("request received");
});

var port = process.argv[2] || process.env.PORT || 3000;
app.listen(parseInt(port));
console.log("Server listening on port 3000");