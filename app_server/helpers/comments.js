var async = require('async');
var mongoose = require('mongoose');

var Comment = mongoose.model('Comment'); 
var Photo = mongoose.model('Photo'); 

module.exports = {
    newest: function(callback){
        //console.log('calling newest..');
        Comment.find({}, {}, { limit: 5, sort: { 'timestamp': -1 }}, function(err, comments){
            var attachPhoto = function(comment, next){
                Photo.findOne({ _id: comment.photoid}, function(err, photo){
                    //console.log(photo);
                    if(err) throw err;
                    comment.photo = photo;
                    next(err);
                });
            }
            //console.log(comments);
            async.each(comments, attachPhoto, function(err){
                if(err) throw err;
                callback(err, comments);
            });
        });
    }
};