var express = require('express');
var path  = require('path');
// db connection
var mongojs = require('mongojs');
var db = mongojs(process.env.MONGODB_DEVELOPMENT_USERNAME + ':' + process.env.MONGODB_DEVELOPMENT_PASSWORD + '@' + process.env.MONGODB_DEVELOPMENT_HOST + ':' + process.env.MONGODB_DEVELOPMENT_PORT + '/' + process.env.MONGODB_DEVELOPMENT_DB, ['contactList']);

var app = express();

// middleware
app.use(express.static(path.join(__dirname + '/views')));

app.get('/contactList', function(req, res){
  db.contactList.find(function(err, data){
    if(err){
      console.log("Something went wrong while getting data from DB");
    }
    res.json(data.map(function(item){
      return {name:item.name, email:item.email, contact:item.contact};
    }));
  });
});

var port = process.argv[2] || process.env.PORT || 3000;
app.listen(parseInt(port));
console.log("Server listening on port 3000");