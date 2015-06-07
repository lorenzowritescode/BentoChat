'use strict'  
const app = require('express')(),
      server = require('http').Server(app),
      port = process.env.PORT || 3000,
      auth = require('./auth.js'),
      db = require('./db.js'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      io = require('./socket-config.js')(server),
      multer = require('multer'); 

app.configure( function () {
    cors();
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:8000");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST");
      next();
    })
    // This is for decoding json POST requests
    app.use(bodyParser.json());       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
      extended: true
    }));
    app.use(multer()); // for parsing multipart/form-data
    auth.init(app);
    db.setup();
});

app.post('/register', function (req, res) {
    var account = req.body;

    auth.createAccount(account, function (err, account) {
        if(err)
            res.status(err.status).end(err.userMessage);
        else
            res.send(account);
    })
})

app.post('/login', function (req, res) {
    var body = req.body,
        email = body.email,
        password = body.password;

    auth.login(email, password, function (err, result) {
      if(err)
        res.status(err.status).end(err.userMessage);

      res.send(result);
    })
})

app.get('/chat', function (req, res) {
    db.findMessages(100, function (err, result) {
        if (!err)
            res.status(200).send(result).end();
        else
            res.status(500).end('Internal Database Error');
    })
})

app.get('/todo', function (req, res) {
  db.getTodos(function(err, result) {
    if (!err)
      res.status(200).send(result).end();
    else
      res.status(500).end('Internal Database Error');
  })
})

app.post('/todo', function (req, res) {
  var todo = req.body;
  console.log(todo);

  db.saveTodo (todo, function(err, result) {
    if (!err)
      res.status(200).send(result).end();
    else
      res.status(500).end('Internal Database Error');
  })
})

app.put('/todo', function(req, res) {
  var id = req.body.id;
  var type = req.body.type;
  console.log(type);
  if (type = "COMPLETE_TODO") {
    db.archiveTodo (id, function(err, result) {
      if (!err)
        res.status(200).send(result).end();
      else
        res.status(500).end('Internal Database Error');
    })
  } else {
    db.toggleTodo (id, function(err, result) {
      if (!err)
        res.status(200).send(result).end();
      else
        res.status(500).end('Internal Database Error');
    })
  }
})

app.get('/wiki', function (req, res) {
    db.getWikiPosts(function(err, result) {
        if (!err)
            res.status(200).send(result).end();
        else
            res.status(500).end('Internal Database Error');
    })
})

app.post('/wiki', function (req, res) {
    var post = req.body;
    console.log(post);

    db.saveWikiPost (post, function(err, result) {
        if (!err)
            res.status(200).send(result).end();
        else
            res.status(500).end('Internal Database Error');
    })
})

server.listen(port);  
console.log('listening on port ' + port);  