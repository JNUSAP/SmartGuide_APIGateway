var Thumbnail = require('thumbnail');
var thumbnail = new Thumbnail('./img', './thumb');

exports.makeThumbnail = function(filename) {
    thumbnail.ensureThumbnail(filename, null, 100, function(err, filename) {
        if (err) console.error(err);
        console.log(filename);
    })
}