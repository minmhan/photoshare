var express = require('express');
var router = express.Router();

var photo = require('../controllers/photo_ctrl');
var homeCtrl = require('../controllers/home_ctrl');

router.get('/', homeCtrl.index1);

// photo pages
router.get('/photos/:photo_id', photo.index1);
router.get('/photos', photo.create);
router.post('/photos', photo.create);
router.post('/photos/:photo_id/like', photo.like);
router.post('/photos/:photo_id/comment', photo.comment);

module.exports = router;