const express = require('express');
const router = express.Router();
const { getGallery, uploadToGallery } = require('../controllers/galleryController');
const { uploadAttachment } = require('../middleware/uploadMiddleware'); // Standard upload middleware

router.get('/', getGallery);
router.post('/', uploadAttachment, uploadToGallery);

module.exports = router;
