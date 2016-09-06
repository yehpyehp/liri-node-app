function displayTweets(user) {

  var keys = require('./keys.js');

  process.env.TWITTER_CONSUMER_KEY = keys.twitterKeys.consumer_key;
  process.env.TWITTER_CONSUMER_SECRET = keys.twitterKeys.consumer_secret;
  process.env.TWITTER_ACCESS_TOKEN_KEY = keys.twitterKeys.access_token_key;
  process.env.TWITTER_ACCESS_TOKEN_SECRET = keys.twitterKeys.access_token_secret;
  
  var Twitter = require('twitter');
  
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  if (user == null) {
    console.log("Invalid input.");
  } else {

    var params = {screen_name: user};

    client.get('statuses/user_timeline', params, function(err, tweets, response) {
        if (!err) {

          console.log("");
          console.log("Newest tweets @" + user);
          console.log("");

          for (var i = 0; i < 20; i++) {
            console.log(tweets[i].text);
            console.log(tweets[i].created_at);
            console.log("");
          } 
        } else {
          console.log("An error has occured while searching for the tweets.");
        }
      });

  };

};


function movieThis(movie) {

  var request = require('request');

  request('http://www.omdbapi.com/?t=' + movie + 
    '&y=&plot=short&tomatoes=true&r=json', function (err, response, body) {

      if (!err && response.statusCode == 200) {

        var data = JSON.parse(body);

        console.log(" ");
        console.log("Title: " + data.Title);
        console.log("Year: " + data.Year);
        console.log("Country: " + data.Country);
        console.log("Language: " + data.Language);
        console.log("Plot: " + data.Plot);
        console.log("---");
        console.log("IMDB Rating: " + data.imdbRating);
        console.log("RottenTomato Rating: " + data.tomatoRating);
        console.log(" ");

      } else {
        console.log("An error has occured while searching for this movie.");
      }
    });

};

function spotify(track){

	var spotify = require('spotify');
	var song = input;

	if(song == undefined){
		spotify.search({ type: 'track', query: "ace of base the sign" }, function(err, data) {
		 	console.log("SONG: " + data.tracks.items[0].name);
    		console.log("ARTIST: " + data.tracks.items[0].artists[0].name);
    		console.log("PREVIEW THIS SONG: " + data.tracks.items[0].preview_url);			
		});
	}
	else{
	spotify.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
        console.log('Error occurred: ' + err);
        return;
    };

    console.log("SONG: " + data.tracks.items[0].name);
    console.log("ARTIST: " + data.tracks.items[0].artists[0].name);
    console.log("PREVIEW THIS SONG: " + data.tracks.items[0].preview_url);
	});

	}

};


function Random() {

  var fs = require('fs');

  fs.readFile("random.txt", "utf8", function(err, data) {

    if ( err ) {
      console.log("An error occured in reading the file.");
      return;
    }

    var dataArray = data.split(',');
    // console.log(dataArray);

    command = dataArray[0];
    input = dataArray[1];
    if (command === "spotify-this-song"){
    spotify();
	};
    console.log(command);
    console.log(input);

  
  });

}



var command = process.argv[2];
var input = process.argv[3];


if (command === "my-tweets"){
	displayTweets(input);
} else if (command === "movie-this"){
	movieThis(input);
} else if (command === "spotify-this-song"){
	spotify(input);
} else if (command === "do-what-it-says"){
	Random();
}





