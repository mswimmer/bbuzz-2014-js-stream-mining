var murmurhash = require('murmurhash');
var Hashes = require('jshashes');

// Constructor
function CountMin(modulus) {
	this.modulus = modulus;
	this.matrix = new Array(4);
	for (var i=0; i < this.matrix.length; i++) {
		this.matrix[i] = new Array(modulus);
		for (var j = 0; j < modulus; j++) {
			this.matrix[i][j] = 0;
		}
	};

}

CountMin.prototype.query = function(str) {
	var hs = this.hashes(str);
	var candidates = this.matrix.map(function(value, index) {
		return value[hs[index]];
	});
	return Math.min.apply(Math, candidates);
};

CountMin.prototype.update = function(str) {
	var hs = this.hashes(str);

	for (var i=0; i < hs.length; i++) {
		this.matrix[i][hs[i]] += 1;
	};
};

CountMin.prototype.getMatrix = function() {
	return this.matrix;
};

CountMin.prototype.hashes = function(str) {
	return [this.MMHM(str), this.XXHM(str), this.ADDITM(str), this.CRC32M(str)];
};

CountMin.prototype.MMHM = function(str) {
	return murmurhash.v3(str) % this.modulus;
};

CountMin.prototype.XXHM = function(str) {
	var XXH = require('xxhashjs');

	return XXH( str, 0xABCD ) % this.modulus;
};

CountMin.prototype.ADDITM = function (str) {
	var x = 0;
	for (i = 0; i < str.length; i += 1 ) {
		x = (x + str.charCodeAt(i)) % this.modulus;
	}
	return x;
};

CountMin.prototype.CRC32M = function (str) {
	return Hashes.CRC32(str) % this.modulus;
};

module.exports = CountMin;
