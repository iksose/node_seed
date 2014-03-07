
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),
  // mongoose = require('mongoose'),
  dads = require('./routes/daddies')
  wine = require('./routes/wines');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
}


// mongoose.connect('mongodb://localhost:27017/test');

// mongoose.connect('mongodb://test1:pass1@ds033679.mongolab.com:33679/iksose_test')

// var db = mongoose.connection;
// 	db.on('error', console.error.bind(console, 'connection error:'));
// 	db.once('open', function callback () {
//   // yay!
//   console.log("Connected to mongoose")

// }); //end mongoose

app.get('/daddies', dads.findAll);


app.get('/wines', wine.findAll);
app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);
app.put('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);


/**
 * Routes
 */

// serve index and view partials
// app.get('/', routes.index);

app.get('/', function(req, res){
  res.render('public/index.html');
});


app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
// app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
