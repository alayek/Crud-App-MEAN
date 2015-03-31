var express = require('express');
var path  = require('path');

var app = express();

// middleware
app.use(express.static(path.join(__dirname + '/views')));

// create dummy data
  var contactList = [
    {
      'name' : 'Tim',
      'email': 'tim@example.com',
      'contact' : '(111)-111 1111'
    },
    {
      'name' : 'Michael',
      'email': 'michael@example.com',
      'contact' : '(223)-134 3542'
    },
    {
      'name' : 'John',
      'email': 'john@example.com',
      'contact' : '(532)-986 9923'
    },
    {
      'name' : 'Jessie',
      'email': 'jes@example.com',
      'contact' : '(176)-111 8651'
    }
  ];
  

app.get('/contactList', function(req, res){
  console.log("request received");
  res.json(contactList);
});

var port = process.argv[2] || process.env.PORT || 3000;
app.listen(parseInt(port));
console.log("Server listening on port 3000");