'use strict'  
const app = require('express')(),
    server = require('http').Server(app),
    port = process.env.PORT || 3000,
    auth = require('./auth.js'),
    db = require('./db.js'),
    cors = require('cors'),
    util = require('./util'),
    bodyParser = require('body-parser'),
    io = require('./socket-config.js')(server),
    multer = require('multer'),
    passport = require('passport'),
    JwtStrategy = require('passport-jwt').Strategy,
    opts = {
        secretOrKey: util.secret
    };

passport.use(new JwtStrategy(opts, function  (jwt_payload, done) {
    db.findUserByEmail(jwt_payload.email, function (err, user) {
        if (err)
            done(err, null)
        else if (!user)
            done(new Error('No user found'), null)
        else
            done(null, user)
    })
}))

app.configure( function () {
    cors();
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
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
    db.setup();
});

app.post('/register', function (req, res) {
    var account = util.makeUser(req.body);

    auth.createAccount(account, function (err, account) {
        if (err)
            res.status(500).end(err.message);
        else
            res.send(account);
    })
})

app.post('/login', function (req, res) {
    var body = req.body,
        email = body.email,
        password = body.password;

    auth.login(email, password, function (err, authToken) {
        if (err || !authToken)
            res.status(400).end(err.message);
        else
            res.status(200).json({
                auth_token: authToken
            });
    })
})

critical ('get', '/chat', function (req, res) {
    db.findMessages(100, function (err, result) {
        if (!err)
            res.status(200).send(result).end();
        else
            res.status(500).end('Internal Database Error');
    })
})

critical('get', '/todo', function (req, res) {
  db.getTodos(function(err, result) {
    if (!err)
      res.status(200).send(result).end();
    else
      res.status(500).end('Internal Database Error');
  })
})

critical ('post', '/todo', function (req, res) {
  var todo = req.body;

  db.saveTodo (todo, function(err, result) {
    if (!err)
      res.status(200).send(result).end();
    else
      res.status(500).end('Internal Database Error');
  })
})

critical ('put', '/todo', function(req, res) {
  var id = req.body.id;
  var type = req.body.type;

  if (type == "COMPLETE_TODO") {
    db.toggleTodo (id, function(err, result) {
      if (!err)
        res.status(200).send(result).end();
      else
        res.status(500).end('Internal Database Error');
    })
  } else if (type == "ARCHIVE_TODO") {
    db.archiveTodo (id, function(err, result) {
      if (!err)
        res.status(200).send(result).end();
      else
        res.status(500).end('Internal Database Error');
    })
  }
})

critical('get', '/group', function (req, res) {
    db.findGroupMembers('test-group', function (err, result) {
      if (!err)
        res.status(200).send(result).end();
      else
        res.status(500).end('Internal Database Error');
    })
})

app.put('/wiki', function(req, res) {
    var id = req.body.postid;
    db.deletePost (id, function(err, result) {
        if (!err)
            res.status(200).send(result).end();
        else
            res.status(500).end('Internal Database Error');
    })
})

critical('get', '/wiki', function (req, res) {
    db.getWikiPosts(function(err, result) {
        if (!err)
            res.status(200).send(result).end();
        else
            res.status(500).end('Internal Database Error');
    })
})

critical ('post', '/wiki', function (req, res) {
    var post = util.makeWikiPost(req.body, req.user);

    db.saveWikiPost (post, function(err, result) {
        if (!err)
            res.status(200).send(result).end();
        else
            res.status(500).end('Internal Database Error');
    })
})

critical ('post', '/wikicomments', function (req, res) {
    var comment = util.makeComment(req.body, req.user);

    db.saveWikiComment (comment, function(err, result) {
        if (!err)
            res.status(200).send(result).end();
        else
            res.status(500).end('Internal Database Error');
    })
})

critical('get', '/wikicomments', function (req, res) {
    db.getWikiComments(function(err, result) {
        if (!err)
            res.status(200).send(result).end();
        else
            res.status(500).end('Internal Database Error');
    })
})

function critical (method, path, handler) {
  var appMethod = app[method];

    if (typeof appMethod === 'function') {
        appMethod = appMethod.bind(app);

        appMethod(
            path, 
            passport.authenticate('jwt', {session: false }),
            handler
        );
    }
}


server.listen(port);  
console.log('listening on port ' + port);  