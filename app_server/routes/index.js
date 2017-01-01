var express = require('express');
var router = express.Router();

var photo = require('../controllers/photo_ctrl');
var homeCtrl = require('../controllers/home_ctrl');

router.get('/', homeCtrl.index1);

// photo pages
router.get('/photos/:photoid', photo.details);
router.get('/photos', photo.create);
router.post('/photos', photo.create);
router.post('/photos/:photoid/like', photo.like);
router.post('/photos/:photoid/comment', photo.comment);
router.delete('/photos/:photoid', photo.delete);

module.exports = router;    