var async = require('async');
var mongoose = require('mongoose');

var Comment = mongoose.model('Comment'); 
var Photo = mongoose.model('Photo'); 

module.exports = {
    popular: function(callback){
        Photo.find({},{},{limit:9,sort:{likes:-1}},function(err,photos){
            callback(null, photos);
        });
    }
}