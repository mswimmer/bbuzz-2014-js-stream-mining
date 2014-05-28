var LfuMap = require("collections/lfu-map");

// Constructor
function TopK() {
	var LfuMap = require("collections/lfu-map");
	this.lm = LfuMap({}, 30);
}
// class methods
TopK.prototype.update = function(key) {
	if (this.lm.has(key)) {
		this.lm.set(key, this.lm.get(key) + 1);
	} else {
		this.lm.set(key, 1);
	};
};

TopK.prototype.toObject = function() {
	return this.lm.toObject();
};

// export the class
module.exports = TopK;
