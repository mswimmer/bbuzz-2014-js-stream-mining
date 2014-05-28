function Tweet(t) {
	this.tweet = t;
}

Tweet.prototype.hashtags = function (callback) {
	if (this.tweet.entities.hashtags.length > 0) {
		for (var i = this.tweet.entities.hashtags.length - 1; i >= 0; i--) {
			callback(this.tweet.entities.hashtags[i].text.toLowerCase());
		};
	};
};

Tweet.prototype.urls = function(callback) {
	if (this.tweet.entities.urls.length > 0) {
		for (var i = this.tweet.entities.urls.length - 1; i >= 0; i--) {
			callback(this.tweet.entities.urls[i].expanded_url.toLowerCase());
		};
	};
};

Tweet.prototype.source = function (callback) {
	if (this.tweet.source) {
		callback(this.tweet.source);
	}
};

Tweet.prototype.retweet_count = function (callback) {
	if (this.tweet.retweet_count) {
		callback(this.tweet.retweet_count);
	}
};

module.exports = Tweet;
