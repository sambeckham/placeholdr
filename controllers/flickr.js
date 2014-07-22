this.getSize = function(width, height) {
    var size = (width > height) ? width : height;

    switch (true) {
        case size < 100: return "url_t";
        case size < 240: return "url_s";
        case size < 320: return "url_n";
        case size < 500: return "url_m";
        case size < 640: return "url_z";
        case size < 800: return "url_c";
        default:         return "url_l";
    }
};

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
        "tag_mode": 'all', // Search tags with AND argument
        "extras": size + ', o_dims', // Pull in the size param and the original dimensions
        "tags": tags // Pull in the tags param
    };

    flickrApi.get("photos.search", properties, function(result){
        var i = 0;
        while(!result.photos.photo[i].hasOwnProperty(size)) i++; // Make sure the photo has the required size

        photo = result.photos.photo[i];
        url = photo[size];
        callback.call(url);
    });
};