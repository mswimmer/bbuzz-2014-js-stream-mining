var zmq = require('zmq');
var sub = zmq.socket('sub');
var CountMin = require("./count_min");

var port = "5555";
sub.connect('tcp://144.76.187.43:' + port);
sub.subscribe('tweet.stream');

var cm = new CountMin(30);
var n = 0;

sub.on('message', function(channel, data) {
	var tweet = JSON.parse(data);
	if (tweet.entities.hashtags.length > 0) {
		for (var i = tweet.entities.hashtags.length - 1; i >= 0; i--) {
			cm.update(tweet.entities.hashtags[i].text);
		};
	};
	
	if (n%1000 == 0) {
		console.log(cm.getMatrix());
	};
	n += 1;
	
});
