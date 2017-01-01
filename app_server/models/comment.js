var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    photoid: { type: mongoose.Schema.ObjectId},
    email: { type: String },
    name: { type: String},
    gravatar: { type: String },
    comment: { type: String },
    timestamp: { type: Date, 'default': Date.now }
})

commentSchema.virtual('photo').set(function(photo){
    this._photo = photo;
}).get(function(){
    return this._photo;
});

module.exports = mongoose.model('Comment', commentSchema);