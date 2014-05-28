var zmq = require('zmq');
var sub = zmq.socket('sub');
var CountMin = require("./count_min");
var Tweet = require("./tweet");

var port = "5555";
sub.connect('tcp://144.76.187.43:' + port);
sub.subscribe('tweet.stream');

var cm = new CountMin(1000);
var n = 0;

sub.on('message', function(channel, data) {
	var tweet = new Tweet(JSON.parse(data));
	tweet.urls(function(key) { cm.update(key) });
	
	if (n % 100 == 0) {
		//console.log(cm.getMatrix());
		tweet.urls(function(key) { console.log(key + ": " + cm.query(key)); });
	};
	n += 1;
	
});
