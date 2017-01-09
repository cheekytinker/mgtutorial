var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./book.model.js');

var db = 'mongodb://localhost:27017/example';

mongoose.Promise = global.Promise;
mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var port = 8080;

app.get('/', function (req, res) {
  res.send('hi');
});

app.get('/books', function (req, res) {
  console.log('getting books');
  Book.find({})
    .exec(function (err, books) {
      if (err) {
        res.send('error has occrured');
      } else {
        console.log(books);
        res.json(books);
      }

    })
});

app.get('/books/:id', function (req, res) {
  console.log('find one book' + req.params.id);
  Book.findOne({
    _id: req.params.id
  })
    .exec(function (err, book) {
      if (err) {
        res.send('error occrred')
      } else {
        console.log(book);
        res.json(book);
      }
    })
});

app.post('/books', function (req, res) {
  var model = req.body;
  console.log('create book', model);
  var book = new Book();
  book.title = model.title;
  book.author = model.author;
  book.category = model.category;
  book.save(function (err) {
    if (err) {
      console.log(err);
      res.send('error');
    }
    res.status(201);
    res.send('done');
  });
});

app.put('/books/:id', function (req, res) {
  Book.findOneAndUpdate({_id: req.params.id},
    {$set: {title: req.body.title}},
    {upsert: true, new: true},
    function (err, newBook) {
      if (err) {
        console.log('error' + err);
        res.send('error');
      } else {
        console.log(newBook);
        res.send(newBook);
      }
    })
});

app.delete('/books/:id', function(req, res) {
  Book.findOneAndRemove({_id:req.params.id},function(err){
    if(err) {
      console.log('error' + err);
      res.send('error');
    } else {
      console.log('removed' + req.params.id);
      res.status(200);
      res.send();
    }
  })
})

app.listen(port, function () {
  console.log('app listening on port: ' + port);
});