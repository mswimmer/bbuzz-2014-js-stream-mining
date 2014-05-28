var zmq = require('zmq');
var sub = zmq.socket('sub');
var TopK = require("./top_k");

var port = "5555";
sub.connect('tcp://144.76.187.43:' + port);
sub.subscribe('tweet.stream');

var n = 0;
var topK = new TopK();

sub.on('message', function(channel, data) {
	var tweet = JSON.parse(data);
	if (tweet.entities.hashtags.length > 0) {
		for (var i = tweet.entities.hashtags.length - 1; i >= 0; i--) {
			topK.update(tweet.entities.hashtags[i].text);
		};
	};
	
	if (n%1000 == 0) {
		console.log(topK.toObject());
	};
	n += 1;
});
