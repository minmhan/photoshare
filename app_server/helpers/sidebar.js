var async = require('async');
var mongoose = require('mongoose');

//var Comment = mongoose.model('Comment'); 
//var Photo = mongoose.model('Photo'); 

var Stats = require('./stats');
var photos = require('./photos');
var comments = require('./comments');

module.exports = function(viewModel, callback){
    console.log('side bar ...');
    async.parallel([
        function(next){
            //next(null, Stats());
            Stats(next);
        },
        function(next){
            //next(null, photos.popular());
            photos.popular(next);
        },
        function(next){
            comments.newest(next);
        }
    ], 
    function(err, results){
        console.log('side bar return ...' + results[1][0].title);
        viewModel.sidebar = {
            stats:results[0],
            popular: results[1],
            comments: results[2]
        };
        callback(viewModel);
    });



};