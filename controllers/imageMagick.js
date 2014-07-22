var fs = require('fs');
var gm = require('gm');

this.resizeImage = function(image, width, height, callback) {
	gm(image)
		.options({imageMagick: true})
		.resize(width, height, '^')
		.gravity('Center')
		.crop(width, height, 0, 0)
		.noProfile()
		.write('.tmp/image.jpg', function (err) {
			if (!err) {
				callback.call(url);
			} else {
				// I should probably throw out a better error here.
				console.log(err);
			}
	});
};