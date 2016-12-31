module.exports.index1 = function(req, res){
    res.render('index',{});
}

module.exports.create = function(req, res) {
    res.render('create',{});
}

module.exports.like = function(req, res){
    res.render('like', {});
}

module.exports.comment = function(req, res){
    res.render('comment', {});
}

