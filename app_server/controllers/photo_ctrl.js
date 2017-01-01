var fs = require('fs');
var path = require('path');
var multer  = require('multer'); // TODO: check required???
var upload = multer({ dest: 'uploads/' });

var sidebar = require('../helpers/sidebar');
var mongoose = require('mongoose');
var md5 = require('MD5');

var Photo = mongoose.model('Photo');
var Comment = mongoose.model('Comment');

module.exports.details = function(req, res){
    var viewModel = {
        photo:{ },
        comments: [],
    };
    Photo.findOne({ filename: { $regex: req.params.photoid }}, function(err, photo){
        if(err) throw err;
        if(photo){
            photo.views += 1;
            viewModel.photo = photo;
            photo.save();
            //console.log('saved...');
            Comment.find( { photoid: photo._id}, {}, { sort: {'timestamp':1 }}, function(err, comments){
                if(err) throw err;
                viewModel.comments = comments;
                sidebar(viewModel, function(viewModel){
                    res.render('photo', viewModel);
                });
            });
        }else{
            console.log('redirect');
            res.redirect('/');
        }
    });
}

module.exports.create = function(req, res) {
    var saveImage = function(){
        var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
        imgUrl = '';
        for(var i=0; i<6; i++){
            imgUrl += possible.charAt(Math.floor(Math.random()*possible.length));
        }

        Photo.find({ filename: imgUrl }, function(err, photos){
            if(photos.length > 0){
                saveImage();
            }
            else{
                //console.log('file...' + req.file)
                var tempPath = req.file.path;
                var ext = path.extname(req.file.originalname).toLowerCase();
                var targetPath = path.resolve('./public/upload/' + imgUrl + ext);

                if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
                    fs.rename(tempPath, targetPath, function(err){
                        if(err) throw err;
                        
                        var newphoto = new Photo({
                            title: req.body.title,
                            description: req.body.description,
                            filename: imgUrl + ext
                        });
                        newphoto.save(function(err, photo){
                            console.log('successfully inserted ' + photo.filename);
                            console.log(photo.uniqueid);
                            res.redirect('/photos/' + photo.uniqueid);
                        });
                        //res.redirect('/photos/' + imgUrl);
                    });
                }else{
                    fs.unlink(tempPath, function(err){
                        if(err) throw err;
                        res.json(500, { error: 'Only image file are allowed '});
                    });
                }
            }
        });
    };

    saveImage();
}

module.exports.like = function(req, res){
    console.log('like ' + req.params.photoid);
    Photo.findOne({ filename: { $regex: req.params.photoid }}, function(err, photo){
        console.log('photo' + photo);
        if(!err && photo){
            console.log(photo);
            photo.likes += 1;
            photo.save(function(err){
                if(err){
                    res.json(err);
                }
                else{
                    res.json( { likes: photo.likes });
                }
            });
        }
        else{
            console.log('err');
        }
    });
}

module.exports.comment = function(req, res){
    Photo.findOne( { filename: { $regex: req.params.photoid}}, function(err, photo){
        if(!err && photo){
            console.log(req.body);
            var newComment = new Comment(req.body);
            newComment.gravatar = md5(newComment.email);
            newComment.photoid = photo._id;
            newComment.save(function(err, comment){
                //console.log(comment._id);
                if(err) throw err;
                res.redirect('/photos/' + photo.uniqueid + '#' + comment._id);
            });
        }else{
            console.log('something wrong');
            res.redirect('/');
        }
    });
}

module.exports.delete = function(req, res){
    Photo.findOne({filename:{$regex:req.params.photoid}}, function(err, photo){
        if(err) throw err;
        fs.unlink(path.resolve('./public/upload/' + photo.filename),function(err){
            if(err) throw err;
            Comment.remove( { photoid: photo._id}, function(err){
                photo.remove(function(err){
                    if(!err){
                        res.json(true);
                    }else{
                        res.json(false);
                    }
                });
            });
        });
    });
};

