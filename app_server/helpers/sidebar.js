var Stats = require('./stats');
var photos = require('./photos');
var comments = require('./comments');

module.exports = function(viewModel, callback){
    viewModel.sidebar = {
        stats:Stats(),
        popular: photos.popular(),
        comments: comments.newest()
    };
    callback(viewModel);
};