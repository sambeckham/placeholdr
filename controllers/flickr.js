this.getSize = function(width, height){
    var largestSize = (width > height) ? width : height,
        sizes = {
            100 : 'url_t',
            240 : 'url_s',
            320 : 'url_n',
            500 : 'url_m',
            640 : 'url_z',
            800 : 'url_c',
            1024 : 'url_l',
        },
        result = sizes[100];

    for (var size in sizes){
        if(largestSize < size){
            result = sizes[size];
            break;
        }
        result = sizes[1024];
    }

    return result;
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
        "tags": tags, // Pull in the tags param
    };

    flickrApi.get("photos.search", properties, function(result){
        var i = 0;
        while(!result.photos.photo[i].hasOwnProperty(size)) i++; // Make sure the photo has the required size

        photo = result.photos.photo[i];
        url = photo[size];
        callback.call(url);
    });
}