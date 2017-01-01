var mongoose = require('mongoose');
var path = require('path');

var photoSchema = new mongoose.Schema({
    title: { type: String, require: true},
    description: { type: String, required: true},
    filename: { type: String, required: true },
    views: { type: Number, 'default':0 },
    likes: { type: Number, 'default':0 },
    timestamp: { type:Date, 'default':Date.now }
});

photoSchema.virtual('uniqueid').get(function(){
    return this.filename.replace(path.extname(this.filename), '');
});

mongoose.model('Photo', photoSchema);