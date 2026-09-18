const express = require('express');
const router = express.Router();
const globalSettingController = require('../controllers/globalSettingController');
const { upload } = require('../middleware/uploadMiddleware'); // Assuming this exists

router.get('/', globalSettingController.getAllSettings);
router.post('/upload', upload.single('file'), globalSettingController.uploadFile);
router.post('/test-smtp', globalSettingController.testSmtp);
router.get('/:key', globalSettingController.getSetting);
router.put('/:key', globalSettingController.saveSetting);

module.exports = router;

