var express = require('express');
var router = express.Router();
var flickr = require('../controllers/flickr');

/* GET home page. */
router.get('/:tags/:width/:height?', function(req, res) {
	var tags = req.params.tags,
		width = parseInt(req.params.width),
		height = parseInt(req.params.height) || width,
		size = flickr.getSize(width, height),
		url = flickr.getPhoto(tags, size, function() {
			res.render('index', { image: this });
		});
});

module.exports = router;