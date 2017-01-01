var async = require('async');
var mongoose = require('mongoose');

var Comment = mongoose.model('Comment'); 
var Photo = mongoose.model('Photo'); 

module.exports = function(callback){
    async.parallel([
        function(next){
            Photo.count({}, function(err, total){
                next(err, total);
            });
        },
        function(next){
            Comment.count({}, function(err, total){
                next(err, total);
            })
        },
        function(next){
            Photo.aggregate({ $group: { _id: '1', viewsTotal: { $sum: '$views'}}}, function(err, result){
                var viewTotal=0;
                if(result.length > 0){
                    viewTotal += result[0].viewsTotal;
                }
                next(null, viewTotal);
            });
        },
        function(next){
            Photo.aggregate({$group: {_id:'1',likesTotal: {$sum:'$likes'}}}, function(err, result){
                var likesTotal = 0;
                if(result.length > 0){
                    likesTotal += result[0].likesTotal;
                }
                next(null, likesTotal);
            });
        }
    ],function(err, results){
        callback(null, {
            images: results[0],
            comments: results[1],
            views: results[2],
            likes: results[3]
        });
    });
};