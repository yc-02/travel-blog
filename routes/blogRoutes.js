const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const {checkCurrentUser} = require('../middleware/authMiddleware')

router.get('/',blogController.blog_index)
router.get('/:id',blogController.blog_details)
router.post('/',checkCurrentUser,blogController.blog_post)
router.delete('/:id',checkCurrentUser,blogController.blog_delete)
router.patch('/:id',checkCurrentUser,blogController.blog_update)



module.exports = router