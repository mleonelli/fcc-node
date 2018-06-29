
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// --> 7)  Mount the Logger middleware here
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next) {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});

// --> 11)  Mount the body-parser middleware  here


/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */
app.get('/string', function(req, res){
  res.send('Hello Express');
});

/** 3) Serve an HTML file */
app.get('/', function(req, res){
  var absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
});

/** 4) Serve static assets  */
app.use(express.static(__dirname + '/public'));

/** 5) serve JSON on a specific route */
app.get('/json', function(req, res){
  app.set('json spaces', 2);
  app.set('json replacer', '');
  
  var obj = { message : 'Hello json'};
  if(process.env.MESSAGE_STYLE === 'uppercase')
    obj.message = obj.message.toUpperCase();

  res.json(obj);
  //res.json({"message": "Hello json"});
});


/** 6) Use the .env file to configure the app */
 process.env.MESSAGE_STYLE
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get('/now', function(req, res, next) {
  req.time = new Date().toString(); // Hypotetical synchronous operation
  next();
}, function(req, res) {
  var obj = { time : req.time};
  res.json(obj);
})

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', function(req, res) {
  var obj = { echo : req.params.word};
  res.json(obj);
})


/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.route('/name')
  .get(function(req, res) {
  var obj = { name : req.query.first + ' ' + req.query.last};
  res.json(obj);
})
  .post(function(req, res) {
   var obj = { name : req.body.first + ' ' + req.body.last};
  res.json(obj);
});
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
