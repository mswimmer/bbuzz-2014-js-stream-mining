var zmq = require('zmq');
var sub = zmq.socket('sub');
var TopK = require("./top_k");
var Tweet = require("./tweet");

var port = "5555";
sub.connect('tcp://144.76.187.43:' + port);
sub.subscribe('tweet.stream');

var n = 0;
var topK = new TopK();

sub.on('message', function(channel, data) {
	var tweet = new Tweet(JSON.parse(data));
	tweet.urls(function(key) { topK.update(key); } );
	
	if (n%1000 == 0) {
		console.log(topK.toObject());
	};
	n += 1;
});

