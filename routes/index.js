var express = require('express');
var router = express.Router();
var flickr = require('../controllers/flickr');

/* GET home page. */
router.get('/:tags/:width/:height?', function(req, res) {
	var tags = req.params.tags,
		width = req.params.width,
		height = req.params.height || width,
		url = flickr.getPhoto(tags, 'url_l', function() {
			res.render('index', { image: this });
		});
});

module.exports = router;