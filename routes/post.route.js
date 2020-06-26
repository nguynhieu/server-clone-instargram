const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const multer = require('multer')
const upload = multer({ dest: 'public/uploads' })

router.get('/', postController.index);

router.post('/', upload.single('image'), postController.newFeed)

router.post('/like', postController.handleLike)

router.post('/comment', postController.handleComment)

module.exports = router;