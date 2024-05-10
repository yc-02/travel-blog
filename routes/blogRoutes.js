const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const {checkCurrentUser} = require('../middleware/authMiddleware');
const {upload} = require('../middleware/multerConfig')







router.get('/',blogController.blog_index)
router.get('/:id',blogController.blog_details)
router.post('/',checkCurrentUser,upload.array("images"),blogController.blog_post)
router.delete('/:id',checkCurrentUser,blogController.blog_delete)
router.patch('/:id',checkCurrentUser,upload.array("images"),blogController.blog_update)



module.exports = router