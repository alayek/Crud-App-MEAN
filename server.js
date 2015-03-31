var express = require('express');
var path  = require('path');
var bodyParser = require('body-parser');

// db connection
var mongojs = require('mongojs');
var db = mongojs(process.env.MONGODB_DEVELOPMENT_USERNAME + ':' + process.env.MONGODB_DEVELOPMENT_PASSWORD + '@' + process.env.MONGODB_DEVELOPMENT_HOST + ':' + process.env.MONGODB_DEVELOPMENT_PORT + '/' + process.env.MONGODB_DEVELOPMENT_DB, ['contactList']);

var app = express();

// middleware
app.use(express.static(path.join(__dirname + '/views')));
app.use(bodyParser.json());

// get request in the contactList route
app.get('/contactList', function(req, res){
  db.contactList.find(function(err, data){
    if(err){
      console.log("Something went wrong while getting data from DB");
    }
    res.json(data.map(function(item){
      return {id: item._id, name:item.name, email:item.email, contact:item.contact};
    }));
  });
});

// get request to edit a contact with id=:id
app.get('/contactList/:id', function(req, res){
  var id = req.params.id;
  db.contactList.findOne({_id: mongojs.ObjectId(id)}, function(err, data){
    if(err) {
      console.error("Something went wrong with search");
      return;
    }
    res.json({id: data._id, name:data.name, email:data.email, contact:data.contact});
  })
});

// post request in the contactList route
app.post('/contactList', function(req, res){
  db.contactList.insert(req.body, function(err, data){
    if(err) {
      console.error("Something went wrong with insertion");
      return;
    }
    res.json({id: data._id, name:data.name, email:data.email, contact:data.contact});
  });
});

// delete request in the contactList/:id route
app.delete('/contactList/:id', function(req, res){
  var id = req.params.id;
  db.contactList.remove({_id: mongojs.ObjectId(id)}, function(err, data){
    if(err) {
      console.error("Something went wrong with deletion");
      return;
    }
    res.json({id: data._id, name:data.name, email:data.email, contact:data.contact});
  });
});

app.put('/contactList/:id', function(req, res){
  db.contactList.findAndModify({query: {_id: mongojs.ObjectId(req.params.id)}, 
                                update: {$set: {name: req.body.name, email:req.body.email,
                                               contact: req.body.contact}},
                               new: true}, function(err, data){
    if(err) {
      console.error("Something went wrong with updating");
      return;
    }
    res.json({id: data._id, name:data.name, email:data.email, contact:data.contact});
  });
})
var port = process.argv[2] || process.env.PORT || 3000;
app.listen(parseInt(port));
console.log("Server listening on port 3000");