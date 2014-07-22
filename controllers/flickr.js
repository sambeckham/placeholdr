// Sizes (by flickr)
// ==========
//
// url_sq : 75 square.
// url_q : 150 square.
//
// url_t : 100 on longest side.
// url_s : 240 on longest side.
// url_n : 320 on longest side.
// url_m : 500 on longest side.
// url_z : 640 on longest side.
// url_c : 800 on longest side.
// url_l : 1024 on longest side.

this.getPhoto = function(tags, size, callback){
    var FlickrApi = require("node-flickr"),
    keys = {"api_key": "76616ca9d5565c4e97fd67e65d4b4ebd"}, // My api key, please change it if you're using this app.
    flickrApi = new FlickrApi(keys),
    properties = {
        "sort": "relevance", // Sort by most relevant
        "media": "photos", // Only get images
        "content_type": 1, // Only get photographs
        "safe_search": 1, // No naughty images
        "privacy_filter": 1, // Only public images
        "tag_mode": 'all' // Search tags with AND argument
        "extras": size, // Pull in the size param
        "tags": tags, // Pull in the tag param
    };

    flickrApi.get("photos.search", properties, function(result){
        var i = 0;
        while(!result.photos.photo[i].hasOwnProperty(size)) i++; // Make sure the photo has the required size

        photo = result.photos.photo[i];
        url = photo[size];
        callback.call(url); // Send the photo URL to the callback function
    });
}