const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');


router.get('/',blogController.blog_index)
router.get('/:id',blogController.blog_details)
router.post('/',blogController.blog_post)
router.delete('/:id',blogController.blog_delete)



module.exports = router