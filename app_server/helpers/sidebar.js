var async = require('async');
var mongoose = require('mongoose');

var Stats = require('./stats');
var photos = require('./photos');
var comments = require('./comments');

module.exports = function(viewModel, callback){
    async.parallel([
        function(next){
            Stats(next);
        },
        function(next){
            photos.popular(next);
        },
        function(next){
            comments.newest(next);
        }
    ], 
    function(err, results){
        viewModel.sidebar = {
            stats:results[0],
            popular: results[1],
            comments: results[2]
        };
        callback(viewModel);
    });
};