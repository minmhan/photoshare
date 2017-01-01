var sidebar = require('../helpers/sidebar');

module.exports.index1 = function(req, res){
    var viewModel = {
        images: [
            {
                uniqueid: 1,
                title: 'sample photo 1',
                description: 'description',
                filename: 'sample1.jpg',
                views: 0,
                likes: 0,
                timestamp: Date.now
            },
            {
                uniqueid: 2,
                title: 'sample photo 2',
                description: 'description',
                filename: 'sample2.jpg',
                views: 0,
                likes: 0,
                timestamp: Date.now
            },
            {
                uniqueid: 3,
                title: 'sample photo 3',
                description: 'description',
                filename: 'sample3.jpg',
                views: 0,
                likes: 0,
                timestamp: Date.now
            },
            {
                uniqueid: 4,
                title: 'sample photo 4',
                description: 'description',
                filename: 'sample1.jpg',
                views: 0,
                likes: 0,
                timestamp: Date.now
            },
        ]
    };

    sidebar(viewModel, function(viewModel){
        res.render('index', viewModel);
    });
    
}

