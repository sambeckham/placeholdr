var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:tags/:width/:height?', function(req, res) {
	var tags = req.params.tags,
		width = req.params.width,
		height = req.params.height || width,
		photo,
		url;

// url_sq : 75 square.
// url_q : 150 square.

// url_t : 100 on longest side.
// url_s : 240 on longest side.
// url_n : 320 on longest side.
// url_m : 500 on longest side.
// url_z : 640 on longest side.
// url_c : 800 on longest side.
// url_l : 1024 on longest side.

	var Flickr = require("node-flickr"),
		keys = {"api_key": "76616ca9d5565c4e97fd67e65d4b4ebd"},
		flickr = new Flickr(keys),
		properties = {
			"tags": tags,
			"sort": "relevance",
			"content_type": 1,
			"safe_search": 1,
			"media": "photos",
			"privacy_filter": 1,
			"extras": "url_l",
			"tag_mode": 'all'
		};

	flickr.get("photos.search", properties, function(result){
		var i = 0;

		// Make sure the photo has the required size
	    while(!result.photos.photo[i].hasOwnProperty("url_l")) {
	    	i++;
	    }
	    photo = result.photos.photo[i];
	    url = photo.url_l;
	    res.render('index', { image: url });
	});
});

module.exports = router;