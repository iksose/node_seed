var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	// Create your Schemas and Models here
	console.log("Connected to Mongoose")
	  // yay!
});


var movieSchema = new mongoose.Schema({
	  title: { type: String }
	, rating: String
	, releaseYear: Number
	, hasCreditCookie: { type: Boolean, required: '{PATH} is required!' }
	, born: { type: Date, required: '{PATH} is required!' }
	});

// Compile a 'Movie' model using the movieSchema as the structure.
// Mongoose also creates a MongoDB collection called 'Movies' for these documents.
var Movie = mongoose.model('Movie', movieSchema);


exports.findAll = function(req, res){
	// Find all movies.
	Movie.find(function(err, movies) {
	  if (err) return console.error(err);
	  console.dir(movies);
	  res.send(movies)
	});

};

exports.addMovie = function(req, res) {
    var movie = new Movie(req.body)
    console.log('Adding movie: ' + JSON.stringify(movie));
    movie.save(function(err, movie) {
	  if (err){
	  	console.error(err)
	  	res.status(500);
	  	res.send({"ErrorMsg": err})
	  	return
	  }else{
	 	console.dir(movie);
	 	console.log('Success');
	 	res.send('Congrats')
		}
	});

}
