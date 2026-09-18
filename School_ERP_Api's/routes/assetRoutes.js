const express = require('express');
const router = express.Router();
const { addAsset, getAssets, issueAsset } = require('../controllers/assetController');

router.post('/', addAsset);
router.get('/', getAssets);
router.post('/issue', issueAsset);

module.exports = router;
