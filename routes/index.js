var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:tags/:width/:height?', function(req, res) {
	var tags = req.params.tags,
		width = req.params.width,
		height = req.params.height || width,
		photo,
		url;

// s	small square 75x75
// q	large square 150x150
// t	thumbnail, 100 on longest side
// m	small, 240 on longest side
// n	small, 320 on longest side
// -	medium, 500 on longest side
// z	medium 640, 640 on longest side
// c	medium 800, 800 on longest side†
// b	large, 1024 on longest side*

	var Flickr = require("node-flickr"),
		keys = {"api_key": "76616ca9d5565c4e97fd67e65d4b4ebd"},
		flickr = new Flickr(keys);

	flickr.get("photos.search", {"tags": tags}, function(result){
	    photo = result.photos.photo[0];
	    url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg';
	    res.render('index', { image: url });
	});
});

module.exports = router;