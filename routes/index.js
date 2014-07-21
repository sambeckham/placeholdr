var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:width/:height?', function(req, res) {
	console.log(req.params);
	var width = req.params.width,
		height = req.params.height || width;

  res.render('index', { image: 'http://placehold.it/' + width + 'x' + height });
});

module.exports = router;