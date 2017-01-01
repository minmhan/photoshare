var sidebar = require('../helpers/sidebar');
var mongoose = require('mongoose');
var Photo = mongoose.model('Photo');


module.exports.index1 = function(req, res){
    var viewModel = {
        images: [] 
    };

    Photo.find({}, {}, { sort: { timestamp: -1 }}, function(err, images){
        if (err)
            throw err;
        viewModel.images = images;
        sidebar(viewModel, function(viewModel){
            res.render('index', viewModel);
        });
    });
}
