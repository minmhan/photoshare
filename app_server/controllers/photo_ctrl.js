var fs = require('fs');
var path = require('path');
var multer  = require('multer'); // TODO: check required???
var upload = multer({ dest: 'uploads/' });

var sidebar = require('../helpers/sidebar');

module.exports.details = function(req, res){
    var viewModel = {
        image:{
            uniqueid:1,
            title: 'sample image',
            description: 'description',
            filename: 'xr43fc.jpg',
            views:0,
            likes:0,
            timestamp: Date.now()
        },
        comments: [
            {
                image_id:1,
                email:'test@mail.com',
                name:'Tester 1',
                gravatar:'http://lorempixel.com/75/75/animals/1',
                comment: 'this is test comment',
                //timestamp: Date.now()
            },
            {
                image_id:2,
                email:'test2@mail.com',
                name:'Tester 12',
                gravatar:'http://lorempixel.com/75/75/animals/1',
                comment: 'this is test comment',
                //timestamp: Date.now()
            }
        ],

        timeago:function(){}
    };

    sidebar(viewModel, function(viewModel){
        res.render('photo', viewModel);
    });
}

module.exports.create = function(req, res) {
    var saveImage = function(){
        var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
        imgUrl = '';
        for(var i=0; i<6; i++){
            imgUrl += possible.charAt(Math.floor(Math.random()*possible.length));
        }
        //console.log('file...' + req.file)
        var tempPath = req.file.path;
        var ext = path.extname(req.file.originalname).toLowerCase();
        var targetPath = path.resolve('./public/upload/' + imgUrl + ext);

        if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
            fs.rename(tempPath, targetPath, function(err){
                if(err) throw err;
                res.redirect('/photos/' + imgUrl);
            });
        }else{
            fs.unlink(tempPath, function(err){
                if(err) throw err;
                res.json(500, { error: 'Only image file are allowed '});
            });
        }
    };
    saveImage();
}

module.exports.like = function(req, res){
    //res.render('like', {});
    res.json({ likes: 1});
}

module.exports.comment = function(req, res){
    res.render('comment', {});
}

