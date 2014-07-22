var express = require('express');
var router = express.Router();
var flickr = require('../controllers/flickr');

var fs = require('fs');
var gm = require('gm');

/* GET home page. */
router.get('/:tags/:width/:height?', function(req, res) {
	var tags = req.params.tags,
		width = parseInt(req.params.width),
		height = parseInt(req.params.height) || width,
		size = flickr.getSize(width, height),
		url = flickr.getPhoto(tags, size, function() {
			gm(this)
				.options({imageMagick: true})
				.resize(width, height, '^')
				.gravity('Center')
				.crop(width, height, 0, 0)
				.noProfile()
				.write('.tmp/image.jpg', function (err) {
				  if (!err) {
				  	res.render('index', { image: '/image.jpg' });
				  }
			});
		});
});

module.exports = router;